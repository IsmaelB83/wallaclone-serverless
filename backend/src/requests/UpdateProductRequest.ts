// Fields in a request to update a product item
export interface UpdateProductRequest {
  name: string
  description: string
  price: number
  type: string
  photoUrl: string
}