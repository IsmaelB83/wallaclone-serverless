// Node Modules
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as AWS from 'aws-sdk'
// Own modules
import { ProductUpdate } from '../models/ProductUpdate'
import { ProductItem } from '../models/ProductItem'

// Constants
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
const DB_CLIENT: DocumentClient = createDynamoDBClient()
const DB_TABLE: string = process.env.PRODUCTS_TABLE!
const DB_INDEX: string = process.env.PRODUCTS_TABLE_INDEX!


/**
* Class to interact with products table
*/
export class ProductAccess {
    
    constructor() {}
    
    /**
    * Get a product from database based on its id and owner
    * @param productId Product id
    * @param userId Product owner id
    */
    async get (productId: string, userId: string): Promise<ProductItem>{
        // Query database
        const result = await DB_CLIENT.query({
            TableName: DB_TABLE,
            IndexName: DB_INDEX,
            KeyConditionExpression: 'userId = :userId and productId = :productId',
            ExpressionAttributeValues: {
                ':userId': userId,
                ':productId': productId
            },
            ScanIndexForward: false,
            Limit : 1
        }).promise()
        // Return
        return result.Items[0] as ProductItem
    }
    
    /**
    * Get all products from user
    * @param userId Product owner id
    */
    async getProducts (): Promise<ProductItem[]>{
        const result = await DB_CLIENT.scan({
            TableName: DB_TABLE,
            FilterExpression: "sold = :sold",
            ExpressionAttributeValues: {
                ':sold': false
            },
        }).promise()
        const items = result.Items?.map(item => (item as ProductItem))
        return items;
    }
    
    /**
    * Get all products from user
    * @param userId Product owner id
    */
    async getProductsUser (userId: string): Promise<ProductItem[]>{
        console.log(userId)
        const result = await DB_CLIENT.query({
            TableName: DB_TABLE,
            KeyConditionExpression: 'userId = :userId',
            FilterExpression: "sold = :sold",
            ExpressionAttributeValues: {
                ':userId': userId,
                ':sold': false
            },
            ScanIndexForward: false
        }).promise()
        const items = result.Items?.map(item => (item as ProductItem))
        return items;
    }
    
    
    /**
    * Get all historic products from user SOLD
    * @param userId Product owner id
    */
    async getHistoryUser (userId: string): Promise<ProductItem[]>{
        console.log(userId)
        const result = await DB_CLIENT.query({
            TableName: DB_TABLE,
            KeyConditionExpression: 'userId = :userId',
            FilterExpression: "sold = :sold",
            ExpressionAttributeValues: {
                ':userId': userId,
                ':sold': true
            },
            ScanIndexForward: false
        }).promise()
        const items = result.Items?.map(item => (item as ProductItem))
        return items;
    }
    
    /**
    * Method to create a new product
    * @param product Product information
    * @returns 
    */
    async create (product: ProductItem): Promise<ProductItem> {
        const params = {
            TableName: DB_TABLE,
            Item: { ...product }
        }
        await DB_CLIENT.put(params).promise()
        return params.Item
    }
    
    /**
    * Method to update a product
    * @param productId Product to update
    * @param userId Product owner
    * @param createdAt Creation date of the product
    * @param product Product information to update
    * @returns  
    */
    async update (productId: string, userId: string, createdAt: string, product: ProductUpdate): Promise<boolean> {
        // Update token
        await DB_CLIENT.update({
            TableName: DB_TABLE,
            Key: {
                userId: userId,
                createdAt: createdAt
            },
            ConditionExpression: "productId = :productId",
            UpdateExpression: "set #name = :name, price=:price, #type=:type, description=:description",
            ExpressionAttributeValues:{
                ":name": product.name,
                ":price": product.price,
                ":type": product.type,
                ":description": product.description,
                ":productId": productId
            },
            ExpressionAttributeNames: {
                "#name": "name",
                "#type": "type"
            }
        }).promise()
        return true
    }
    
    /**
    * Method to update as booked (or not) a product
    * @param productId Product to update
    * @param userId Product owner
    * @param createdAt Creation date of the product
    * @param book True or false
    * @returns  
    */
    async book (productId: string, userId: string, createdAt: string, book: boolean): Promise<boolean> {
        // Update token
        await DB_CLIENT.update({
            TableName: DB_TABLE,
            Key: {
                userId: userId,
                createdAt: createdAt
            },
            ConditionExpression: "productId = :productId",
            UpdateExpression: "set booked=:booked",
            ExpressionAttributeValues:{
                ":booked": book,
                ":productId": productId
            }
        }).promise()
        return true
    }
    
    /**
    * Method to update as sold (or not) product
    * @param productId Product to update
    * @param userId Product owner
    * @param createdAt Creation date of the product
    * @param sold True or false
    * @returns  
    */
    async sold (productId: string, userId: string, createdAt: string, sold: boolean): Promise<boolean> {
        // Update token
        await DB_CLIENT.update({
            TableName: DB_TABLE,
            Key: {
                userId: userId,
                createdAt: createdAt
            },
            ConditionExpression: "productId = :productId",
            UpdateExpression: "set sold=:sold",
            ExpressionAttributeValues:{
                ":sold": sold,
                ":productId": productId
            }
        }).promise()
        return true
    }
    
    /**
    * Method to update a product
    * @param productId Product to update
    * @param userId Product owner
    * @param createdAt Creation date of the product
    * @param attachmentUrl Product information to update
    * @returns  
    */
    async updateAttachmentUrl (productId: string, userId: string, createdAt: string, attachmentUrl: String): Promise<boolean> {
        // Update token
        await DB_CLIENT.update({
            TableName: DB_TABLE,
            Key: {
                userId: userId,
                createdAt: createdAt
            },
            ConditionExpression: "productId = :productId",
            UpdateExpression: "set photoUrl = :photoUrl",
            ExpressionAttributeValues:{
                ":productId": productId,
                ":photoUrl": attachmentUrl
            }
        }).promise()
        return true
    }
    
    /**
    * Method to delete a product
    * @param productId Product Id 
    * @param userId Product owner (hash)
    * @param createdAt Creation date of the product
    * @returns True (deleted) or false (error)
    */
    async delete (productId: string, userId: string, createdAt: string): Promise<boolean> {
        // Delete token
        await DB_CLIENT.delete({
            TableName: DB_TABLE,
            Key: {
                userId: userId,
                createdAt: createdAt
            },
            ConditionExpression: "productId = :productId",
            ExpressionAttributeValues:{
                ":productId": productId
            },
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