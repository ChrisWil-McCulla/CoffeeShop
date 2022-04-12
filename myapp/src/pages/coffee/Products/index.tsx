import {Product, Products, ProductVariant} from "@/pages/coffee/types";
import {Card, Row, Col, CardProps, Button, Modal, Slider, Image} from "antd"
import {useEffect, useState} from "react";
import AddToBasket from "@/pages/coffee/AddToBasket";

/*
ProductsProps
  list
  color
  fontSize
  width
  height
 */
interface ProductsProps extends Products {
  innerCard?: CardProps,
  onCoffeeSelected: (product: Product, qty: Record<string, number>) => void
}


const ProductsView = (props: ProductsProps) => {

  console.log("im here")
  const {list, innerCard, onCoffeeSelected} = props;

  const [state, setState] = useState<Product>();

  const onVariantSelected = (/*variant: ProductVariant,*/ product: Product) => {
    setState(product)
  }
  useEffect(() => {
  }, [state])

  const handleCoffeeSubmit = (qty: Record<string, number>) => {

    if (!state) return

    onCoffeeSelected(state, qty)
    setState(undefined)
  }

  return (
    <>
      {/*Maybe display selected coffee?*/}
      {/*onClick - need to make a click function and use state to map*/}
      {/*How do we mark current coffee ?*/}
      {/*have random description? Joke maybe ?*/}

      <Card {...innerCard}>
        <Row gutter={[16, 16]}>
          {list.map((element, index) => {

            const pricing = element.variants.map((item) => {
              return (
                <div>Add To Basket</div>
                // <div
                //   onClick={() => onVariantSelected(item, element)}
                //   style={{backgroundColor: (element.name == state?.name && item.size == variant?.size) ? "#95de64" : undefined}}>
                //   <p>£{item.price}</p>
                //   <p>{item.size} - {item.calories} Calories</p>
                // </div>
              )
            })

            return (
              <Col span={8} key={index}>
                <Card
                  style={{backgroundColor: element.name == state?.name ? "#D3D3D3" : undefined}}
                  title={element.name}
                  //actions={pricing}
                  actions={[<Button onClick={() => onVariantSelected(/*item,*/ element)} type="link"> Add To
                    Basket</Button>]}
                  hoverable

                  cover={<Image src={element.image} height={200} preview={false}></Image>}
                  //cover={<img alt="example" src={element.image} style={{maxHeight: 500, maxWidth: 200, resize: "both"}}/>}
                >
                  <Card.Meta description={element.description}/>
                </Card>
              </Col>
            )
          })}
        </Row>
        {state && (
          <AddToBasket
            product={state}
            onCancel={() => setState(undefined)}
            onSubmit={handleCoffeeSubmit}
          />
        )}
      </Card>
    </>
  )
}

/*
  string myName;
  myName = "Ellen"


  string myName = "Ellen";


 */


export default ProductsView
