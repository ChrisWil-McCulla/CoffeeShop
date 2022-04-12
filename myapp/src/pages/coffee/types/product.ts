
/*

Product
  coffee
  tea
  other

strength
size?
calories
*/

export type ProductType = "tea" | "coffee" | "other";
export type ProductSize = "small" | "medium" | "large" | "xlarge" | "xxlarge";

export interface ProductVariant {
  price: number,  // variants
  size: ProductSize,  // variants
  calories: number,   // variants
}

export interface Product {
  name: string,   //always apply
  type: ProductType, // always apply
  description?: string,
  image: string,
  variants: ProductVariant[]

}

export interface Products {
  list: Product[]
}
