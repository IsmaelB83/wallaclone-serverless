// Node modules
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cors, httpErrorHandler } from 'middy/middlewares'
import 'source-map-support/register'
import * as middy from 'middy'
// Own modules
import { createAvatarPresignedUrl } from '../../../businessLogic/user'
import { createLogger } from '../../../utils/logger'
import { getUserId } from '../../utils'

// Constants
const LOGGER = createLogger('Users')

// Handler function to generate a pre-signed url to upload an image to the bucket
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      // Generate pre-signed url
      const uploadUrl = await createAvatarPresignedUrl(getUserId(event))
      // Return Ok
      return {
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({
              uploadUrl
          })
      }     
    } catch (e) {
      // Log
      LOGGER.error('Error generating presigned url', { error: e.message })
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
  .use(
    cors({
      credentials: true
    })
  )
