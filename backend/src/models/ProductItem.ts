export interface ProductItem {
  userId: string
  productId: string
  createdAt: string
  name: string
  description: string
  price: number
  type: string
  photoUrl: string
  booked: boolean
  sold: boolean
}