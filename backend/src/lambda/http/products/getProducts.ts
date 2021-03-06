// Node Modules
import { APIGatewayProxyResult } from 'aws-lambda'
import { cors } from 'middy/middlewares'
import 'source-map-support/register'
import * as middy from 'middy'
// Own modules
import { getProducts } from '../../../businessLogic/products'
import { createLogger } from '../../../utils/logger'

// Constants
const LOGGER = createLogger('Products')

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (): Promise<APIGatewayProxyResult> => {
    try {
      // Get products 
      const products = await getProducts();
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
