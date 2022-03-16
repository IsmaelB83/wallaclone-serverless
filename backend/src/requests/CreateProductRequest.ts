// Fields in a request to create a product item
export interface CreateProductRequest {
  name: string
  description: string
  price: number
  type: string
  photoUrl: string
  tag: string
}
