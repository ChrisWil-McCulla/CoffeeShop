import React from "react";
import {Card, Drawer} from "antd";
import {BasketItem} from "@/pages/coffee/types/basket";

interface OrderReviewProps {
  onClose: () => void,
  products: BasketItem[]

}

const OrderReview = (props: OrderReviewProps) => {
  return (
    <Drawer visible title={"Checkout"} onClose={props.onClose} footer="Really? GO HOME! No coffee today :(s">
      {props.products.map((item) => {
        return (
          <Card title={item.name}>

          </Card>
        )
      })}
    </Drawer>
  )
}


export default OrderReview
