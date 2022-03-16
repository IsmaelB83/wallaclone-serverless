export interface ProductItem {
  userId: string
  slug: string
  createdAt: string
  name: string
  description: string
  price: number
  type: string
  photoUrl: string
  tag: string
  booked: boolean
  sold: boolean
}