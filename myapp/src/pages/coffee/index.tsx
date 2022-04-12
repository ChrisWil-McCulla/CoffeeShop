import {PageContainer} from "@ant-design/pro-layout";
import {ShoppingCartOutlined} from "@ant-design/icons";
import Products from "@/pages/coffee/Products";
import {Product, ProductVariant, BasketItem} from "./types";
import numeral from "numeral";

import {useMemo, useState, useEffect} from 'react';
import {Badge} from "antd";
import OrderReview from "@/pages/coffee/OrderReview";
import {json} from "express";

const coffeeList: Product[] = [
  {
    type: "coffee",
    name: "Latte",
    description: "An espresso drink for milk lovers",
    image: "https://th.bing.com/th/id/R.b9e4e2bce786805ddb2cbd458d92ce9c?rik=XInrKZBZzJxy2w&riu=http%3a%2f%2fwww.aerolatte.com%2fwp-content%2fuploads%2f2020%2f02%2fthree-layer-mochiato.jpg&ehk=n9S184%2fQGP0CEpWqd%2br%2fiVaX%2f%2fbzqH9MpNhJuPMiApA%3d&risl=&pid=ImgRaw&r=0",
    variants: [
      {
        price: 3.25,
        size: "small",
        calories: 50
      },
      {
        price: 3.55,
        size: "medium",
        calories: 60
      },
      {
        price: 4.55,
        size: "large",
        calories: 70
      },
      {
        price: 4.55,
        size: "xlarge",
        calories: 70
      },
      {
        price: 4.55,
        size: "xxlarge",
        calories: 70
      }
    ]
  },
  {
    type: "coffee",
    name: "Cappuccino",
    description: "Frothy boy",
    image: "https://th.bing.com/th/id/R.d2b016ebe5838e96f9c5ac3d904e7a7e?rik=D0ZpXAvOkZ0prg&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f1249%2f8845%2fproducts%2fHazelnut_Cappuccino_Coffee_Fragrance_1024x1024.jpg%3fv%3d1501188489&ehk=lgOtxGvFnC2ricmPw%2fKMJ7hEtr31zPlen%2bKQBrHy70M%3d&risl=&pid=ImgRaw&r=0",
    variants: [
      {
        price: 3.25,
        size: "small",
        calories: 50
      },
      {
        price: 3.55,
        size: "medium",
        calories: 60
      },
      {
        price: 4.55,
        size: "large",
        calories: 70
      }
    ]
  },
  {
    type: "coffee",
    name: "Mocha",
    description: "Chocolate and coffee - a barista's favourite combination",
    image: "https://th.bing.com/th/id/OIP.2EOZq8YSiAJb4h9yE5c-fwHaLG?pid=ImgDet&rs=1",
    variants: [
      {
        price: 3.25,
        size: "small",
        calories: 50
      },
      {
        price: 3.55,
        size: "medium",
        calories: 60
      },
      {
        price: 4.55,
        size: "large",
        calories: 70
      }
    ]
  },
  {
    type: "coffee",
    name: "Flat White",
    description: "Best made with soy milk",
    image: "https://th.bing.com/th/id/OIP.RGQXlHTeLyLMhPKsyGHLNAHaHk?pid=ImgDet&rs=1",
    variants: [
      {
        price: 3.25,
        size: "small",
        calories: 50
      },
      {
        price: 3.55,
        size: "medium",
        calories: 60
      },
      {
        price: 4.55,
        size: "large",
        calories: 70
      }
    ]
  },
  {
    type: "coffee",
    name: "Espresso",
    description: "One for the straight up bitter",
    image: "https://th.bing.com/th/id/OIP.U4GH6G7u7zhHud8CSgEUHAHaLH?pid=ImgDet&rs=1",
    variants: [
      {
        price: 3.25,
        size: "small",
        calories: 50
      },
      {
        price: 3.55,
        size: "medium",
        calories: 60
      },
      {
        price: 4.55,
        size: "large",
        calories: 70
      }
    ]
  },
  {
    type: "coffee",
    name: "Americano",
    description: "Just need a caffeine kick to get you through the day?",
    image: "https://th.bing.com/th/id/OIP.sdShgTtRmRdItbLlhgE3MQHaE7?pid=ImgDet&rs=1",
    variants: [
      {
        price: 3.25,
        size: "small",
        calories: 50
      },
      {
        price: 3.55,
        size: "medium",
        calories: 60
      },
      {
        price: 500,
        size: "large",
        calories: 70
      }
    ]
  },

]

/*ProductVariant + Product

  If user adds coffee and the variant ( size) exists, increase quantity
  IF not, add variant with quantity 1

  export interface ProductVariant {
  price: number,  // variants
  size: ProductSize,  // variants
  calories: number,   // variants
}*/

const Coffee = () => {

  const [basket, setBasket] = useState<BasketItem[]>([])
  const [basketVisible, setBasketVisible] = useState<boolean>(false)

  useEffect(() => {
    console.log("basket: ", basket)
  },[basket])

  const totalCoffees = useMemo(() => {
    let totalQty = 0;
    let totalPrice = 0;
    basket.forEach((item) => {
      item.variants.forEach((variant) => {
        totalQty += variant.qty
        totalPrice += variant.price * variant.qty
      })
    })
    return [totalQty, totalPrice];
  }, [basket])


  const onCoffeeSelected = (product: Product, variants: Record<string, number>) => {

    //1. is the coffee in the basket?
    let coffeeIndex = basket.findIndex((item) => item.name === product.name)
    if (coffeeIndex < 0) {
      //basket.push({...product, variants: []});
      basket.push({
        ...product,
        variants: product.variants.map((x) => {
          return {...x, qty: 0}
        })
      });

      console.log("CHECK LINES BELOW")
      console.log("before MAP", product.variants)
      console.log("after MAP", product.variants.map((x) => {
        return {...x, qty: 0}
      }))

      coffeeIndex = basket.length - 1
    }
    //here, we have our coffee index
    //2. is the variant in the coffee?
    const coffee = basket[coffeeIndex];

    Object.entries(variants).forEach(([size, qty]) => {
      const variantIndex = coffee.variants.findIndex((item) => item.size === size);
      coffee.variants[variantIndex].qty += qty
    })


    setBasket(basket.map((item) => {
      if (item.name == coffee.name)
        return coffee;
      return item;
    }))
  }


  return (
    <PageContainer
      title={`Our Coffee Place - Total Order ${numeral(totalCoffees[1]).format("£ 0,0.00")} for  ${totalCoffees[0]} coffees.`}
      extra={(
        <Badge count={totalCoffees[0]}>
          <ShoppingCartOutlined style={{fontSize: 40}}
                                onClick={() => setBasketVisible(true)}/>
        </Badge>
      )}
    >
      <Products list={coffeeList} onCoffeeSelected={onCoffeeSelected}/>
      {basketVisible && (
        <OrderReview onClose={() => setBasketVisible(false)} products={basket}/>
      )}
    </PageContainer>
  )
}

export default Coffee;
