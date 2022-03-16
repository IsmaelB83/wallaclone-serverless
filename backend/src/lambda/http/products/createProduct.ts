// Node modules
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
// Own modules
import { CreateProductRequest } from '../../../requests/CreateProductRequest'
import { createProduct } from '../../../businessLogic/products'
import { createLogger } from '../../../utils/logger'
import { getUserId } from '../../utils'

// Constants
const LOGGER = createLogger('Products')

// Handler function to create a product
export const handler = middy(
  async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {  
    try {
      // Product object
      const newProduct: CreateProductRequest = JSON.parse(event.body)
      // Create product
      const product = await createProduct(newProduct, getUserId(event), context.awsRequestId);
      // Return OK
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          item: product
        })
      } 
    } catch (e) {
      // Log
      LOGGER.error('Error creating product', { error: e.message })
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
