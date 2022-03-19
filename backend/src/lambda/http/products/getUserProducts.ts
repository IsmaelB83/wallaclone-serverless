// Node Modules
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cors } from 'middy/middlewares'
import 'source-map-support/register'
import * as middy from 'middy'
// Own modules
import { getProductsForUser } from '../../../businessLogic/products'
import { createLogger } from '../../../utils/logger'
import { getUserId } from '../../utils'

// Constants
const LOGGER = createLogger('Products')

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      // Get products 
      const products = await getProductsForUser(getUserId(event));
      // Return items
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          Items: products
        })
      } 
    } catch (e) {
      // Log
      LOGGER.error('Error getting products', { error: e.message })
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

handler.use(
  cors({
    credentials: true
  })
)
