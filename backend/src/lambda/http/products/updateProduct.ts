// Node modules
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cors, httpErrorHandler } from 'middy/middlewares'
import 'source-map-support/register'
import * as middy from 'middy'
// Own modules
import { updateProduct } from '../../../businessLogic/products'
import { createLogger } from '../../../utils/logger'
import { getUserId } from '../../utils'

// Constants
const LOGGER = createLogger('Products')

// Handler function to update a product
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      // Constants
      const productId = event.pathParameters.productId
      const updatedProduct = JSON.parse(event.body)
      // Update product
      const product = await updateProduct(productId, getUserId(event), updatedProduct)
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          Result: 'Ok. Product updated',
          Item: product
        })
      }
    } catch (e) {
      // Log
      LOGGER.error('Error updating product', { error: e.message })
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
