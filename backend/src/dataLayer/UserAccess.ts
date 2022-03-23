// Node Modules
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as AWS from 'aws-sdk'
// Own modules
import { UserItem } from '../models/UserItem'
import { UserUpdate } from '../models/UserUpdate'

// Constants
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
const DB_CLIENT: DocumentClient = createDynamoDBClient()
const DB_TABLE: string = process.env.USERS_PROFILE_TABLE!


/**
* Class to interact with products table
*/
export class UserAccess {
    
    constructor() {}
    
    /**
    * Get a user profile from database based on its id
    * @param userId Product owner id
    */
    async get (userId: string): Promise<UserItem>{
        // Query database
        const result = await DB_CLIENT.query({
            TableName: DB_TABLE,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            },
            ScanIndexForward: false,
            Limit : 1
        }).promise()
        // Return
        return result.Items[0] as UserItem
    }
    
    /**
    * Method to update a user profile
    * @param userId Product owner
    * @returns  
    */
    async update (userId: string, user: UserUpdate): Promise<boolean> {
        // Update token
        console.log(userId)   
        console.log(user)
        await DB_CLIENT.update({
            TableName: DB_TABLE,
            Key: {
                userId: userId,
            },
            UpdateExpression: "set #name = :name, email=:email, login=:login",
            ExpressionAttributeValues:{
                ":name": user.name,
                ":email": user.email,
                ":login": user.login,
            },
            ExpressionAttributeNames: {
                "#name": "name",
            }
        }).promise()
        return true
    }
    
    /**
    * Method to update a USER
    * @param userId User id
    * @param attachmentUrl User avatar url to update
    * @returns  
    */
    async updateAttachmentUrl (userId: string, attachmentUrl: String): Promise<boolean> {
        // Update token
        await DB_CLIENT.update({
            TableName: DB_TABLE,
            Key: {
                userId: userId
            },
            UpdateExpression: "set photoUrl = :photoUrl",
            ExpressionAttributeValues:{
                ":photoUrl": attachmentUrl
            }
        }).promise()
        return true
    }
}

function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }
    return new XAWS.DynamoDB.DocumentClient()
}