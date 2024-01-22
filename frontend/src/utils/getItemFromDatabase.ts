import { ProductProps } from '../@types/product'
import { database } from '../database/mock_data'

const products = database.products

type getItemFromDatabaseResponse = ProductProps

export function getItemFromDatabase(
  idProduct: number,
): getItemFromDatabaseResponse {
  const product = products.find((prod) => prod.id === idProduct)

  if (!product) {
    throw new Error('Product not found!')
  }

  return product
}
