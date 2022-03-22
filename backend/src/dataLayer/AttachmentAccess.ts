// Node Modules
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

// Constants
const XAWS = AWSXRay.captureAWS(AWS)
const S3 = new XAWS.S3({'signatureVersion': 'v4'});
const EXPIRATION: number = parseInt(process.env.SIGNED_URL_EXPIRATION || "300");
const BUCKET_ATTACHMENTS: string = process.env.ATTACHMENT_S3_BUCKET!;
const BUCKET_AVATARS: string = process.env.AVATAR_S3_BUCKET!;

// Return pre-signed url
export async function getAttachmentUploadUrl(productId: string): Promise<String> {
  // Generate pre-signed url
  return S3.getSignedUrl('putObject', {
    Bucket: BUCKET_ATTACHMENTS,
    Key: productId,
    Expires: EXPIRATION
  })
}

// Return pre-signed url
export async function getAvatarUploadUrl(productId: string): Promise<String> {
    // Generate pre-signed url
    return S3.getSignedUrl('putObject', {
      Bucket: BUCKET_AVATARS,
      Key: productId,
      Expires: EXPIRATION
    })
  }