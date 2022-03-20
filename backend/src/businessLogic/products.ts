// Node Modules
// Own Modules
import { ProductItem } from '../models/ProductItem'
import { CreateProductRequest } from '../requests/CreateProductRequest'
import { UpdateProductRequest } from '../requests/UpdateProductRequest'
import { ProductAccess } from '../dataLayer/ProductAccess'
import { getAttachmentUploadUrl } from '../dataLayer/AttachmentAccess'

// Constants
const PRODUCT_ACCESS = new ProductAccess()

    /**
    * Receives the API event and interacts with datalayer to RETRIEVES all products from user
    * @returns List of products from user
    */
    export async function getProducts(): Promise<ProductItem[]> {
    // Get products
    return await PRODUCT_ACCESS.getProducts()
  }

/**
* Receives new product information and interacts with datalayer to INSERT a new product in the database
* @param product Product information received from client
* @param userId Owner of the product
* @param context Used to obtain the UUID
* @returns Returns the new product in database
*/
export async function createProduct(product: CreateProductRequest, userId: string, uuid: string): Promise<ProductItem> {
  // Create product
  return await PRODUCT_ACCESS.create({
    userId: userId,
    productId: uuid,
    createdAt: new Date().toISOString(),
    booked: false,
    sold: false,
    ...product
  })
}

/**
* Receives new product information and interacts with datalayer to UPDATE an existing product in the database
* @param productId ProductId to update
* @param userId Owner of the product
* @param updatedProduct New Product information
* @returns True (update correct) or False (error updating)
*/
export async function updateProduct(productId: string, userId: string, updatedProduct: UpdateProductRequest): Promise<boolean> {
  // Get old product information
  const product = await PRODUCT_ACCESS.get(productId, userId)
  // Check user id of token is the same as user in bearer
  if (product && product.userId === userId) {
    const newProduct = {
      name: updatedProduct.name || product.name,
      description: updatedProduct.description || product.description,
      price: updatedProduct.price || product.price,
      type: updatedProduct.type || product.type,
      photoUrl: updatedProduct.photoUrl || product.photoUrl
    }
    return await PRODUCT_ACCESS.update(productId, userId, product.createdAt, newProduct)
  }
  throw `User not authorized to update product ${productId}`
}

/**
* Receives new product information and interacts with datalayer to UPDATE its booked property in database
* @param productId ProductId to update
* @param userId Owner of the product
* @returns Updated product
*/
export async function bookProduct(productId: string, userId: string): Promise<ProductItem> {
  // Get old product information
  const product = await PRODUCT_ACCESS.get(productId, userId)
  product.booked = !product.booked
  // Check user id of token is the same as user in bearer
  if (product && product.userId === userId) {
    await PRODUCT_ACCESS.book(productId, userId, product.createdAt, product.booked)
    return product;
  }
  throw `User not authorized to mark as booked a product ${productId}`
}

/**
* Receives new product information and interacts with datalayer to UPDATE an existing product in the database
* @param productId ProductId to update
* @param userId Owner of the product
* @returns Updated product
*/
export async function soldProduct(productId: string, userId: string): Promise<ProductItem> {
  // Get old product information
  const product = await PRODUCT_ACCESS.get(productId, userId)
  product.sold = !product.sold
  // Check user id of token is the same as user in bearer
  if (product && product.userId === userId) {
    await PRODUCT_ACCESS.sold(productId, userId, product.createdAt, product.sold) 
    return product;
  }
  throw `User not authorized to mark as sold a product ${productId}`
}

/**
* Receives a productId and interacts with datalayer to DELETE the product from database
* @param productId ProductId to delete
* @param userId Owner of the product
* @returns True (delete corret) or False (error deleting)
*/
export async function deleteProduct(productId: string, userId: string): Promise<boolean> {
  // Get old product information
  const product = await PRODUCT_ACCESS.get(productId, userId)
  // Check user id of token is the same as user in bearer
  if (product && product.userId === userId) {
    return await PRODUCT_ACCESS.delete(productId, userId, product.createdAt)
  }
  throw `User not authorized to delete product ${productId}`
}

/**
* Receives the API event and interacts with datalayer to RETRIEVES all products from user
* @param userId Owner of the product
* @returns List of products from user
*/
export async function getProductsForUser(userId: string): Promise<ProductItem[]> {
  // Get products
  return await PRODUCT_ACCESS.getProductsUser(userId)
}

/**
* Receives the API event and interacts with datalayer to RETRIEVES all history from user
* @param userId Owner of the product
* @returns List of products from user
*/
export async function getHistoryForUser(userId: string): Promise<ProductItem[]> {
    // Get products
    return await PRODUCT_ACCESS.getHistoryUser(userId)
  }

  
/**
* Receives the API event and interacts with datalayer to RETRIEVES a specific product
* @param productId ID of the product
* @param userId ID of the product owner
* @returns List of products from user
*/
export async function getProduct(productId: string, userId: string): Promise<ProductItem> {
  // Get product
  return await PRODUCT_ACCESS.get(productId, userId)
}

/**
* Interact with attachment utils to generate the pre-signed url from S3 bucket, and update the product accordingly
* @param productId ProductId to generate the presigned url
* @param userId Owner of the product
* @returns String representing the presigned url
*/
export async function createAttachmentPresignedUrl(productId: string, userId: string): Promise<String> {
  // Get old product information
  const product = await PRODUCT_ACCESS.get(productId, userId)
  // Check user id of token is the same as user in bearer
  if (product && product.userId === userId) {
    // Constants
    const presignedUrl = await getAttachmentUploadUrl(productId)
    // Update attachment url
    PRODUCT_ACCESS.updateAttachmentUrl(productId, userId, product.createdAt, `${process.env.ATTACHMENT_S3_URL}${productId}`)
    // Return presigned url
    return presignedUrl
  } 
  throw `User not authorized to update attachment url of the product ${productId}`
}