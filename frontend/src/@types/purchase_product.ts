import { CoffeTypes } from '../utils/imageMapping'

export interface PurchaseProductProps {
  product_id: number
  name: string
  image_url: CoffeTypes
  quantity: number
  price: number
}
