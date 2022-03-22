// Node Modules
// Own Modules
import { UserItem } from '../models/UserItem'
import { UpdateUserRequest } from '../requests/UpdateUserRequest'
import { UserAccess } from '../dataLayer/UserAccess'
import { getAvatarUploadUrl } from '../dataLayer/AttachmentAccess'

// Constants
const USER_ACCESS = new UserAccess()

/**
* Receives the API event and interacts with datalayer to RETRIEVES a specific USER PROFILE
* @param userId ID of the product owner
* @returns User profile
*/
export async function getUser(userId: string): Promise<UserItem> {
    // Get product
    return await USER_ACCESS.get(userId)
}

/**
* Receives new user profile information and interacts with datalayer to UPDATE an existing user profile in the database
* @param userId Owner of the product
* @param updatedUser New user profile information
* @returns Updated user profile item
*/
export async function updateUser(userId: string, updatedUser: UpdateUserRequest): Promise<UserItem> {
    // Get old user information
    const user = await USER_ACCESS.get(userId)
    user.name = updatedUser.name || user.name
    user.email = updatedUser.email || user.email
    await USER_ACCESS.update(userId, user)
    return user
}

/**
* Interact with attachment utils to generate the pre-signed url from S3 bucket, and update the user profile accordingly
* @param userId Owner of the product
* @returns String representing the presigned url
*/
export async function createAvatarPresignedUrl(userId: string): Promise<String> {
    // Constants
    const presignedUrl = await getAvatarUploadUrl(userId)
    // Update attachment url
    USER_ACCESS.updateAttachmentUrl(userId, `${process.env.AVATAR_S3_URL}${userId}`)
    // Return presigned url
    return presignedUrl
}