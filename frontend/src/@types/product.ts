import { CoffeTypes } from '../utils/imageMapping'

interface TagProps {
  id: string
  tag: string
}

export interface ProductProps {
  id: number
  image_url: CoffeTypes
  name: string
  description: string
  tags: TagProps[]
  price: number
  created_at: string
  updated_at: string
}
