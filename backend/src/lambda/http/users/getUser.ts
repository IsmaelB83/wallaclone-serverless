// Node modules
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cors, httpErrorHandler } from 'middy/middlewares'
import 'source-map-support/register'
import * as middy from 'middy'
// Own modules
import { getUser } from '../../../businessLogic/user'
import { createLogger } from '../../../utils/logger'
import { getUserId } from '../../utils'

// Constants
const LOGGER = createLogger('Users')

// Handler function to update a product
export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            // Get user and return data
            const user = await getUser(getUserId(event))
            return {
                statusCode: 200,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({
                    Item: user
                })
            }
        } catch (e) {
            // Log
            LOGGER.error('Error reading user', { error: e.message })
            // Return KO
            return {
                statusCode: 500,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({
                    result: e.message
                })
            } 
        }
    }
    )
    
    handler
    .use(httpErrorHandler())
    .use(cors({
        credentials: true
    })
)