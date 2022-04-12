import {Product, ProductVariant} from "./product";

export interface BasketItemVariant extends ProductVariant {
  qty: number
}

export interface BasketItem extends Omit<Product, 'variants'> {
  variants: BasketItemVariant[]
}
