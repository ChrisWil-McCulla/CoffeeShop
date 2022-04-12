import {Col, message} from "antd";
import {ModalForm, ProForm, ProFormDigit, ProFormInstance} from "@ant-design/pro-form";
import {Product, ProductSize} from "@/pages/coffee/types";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useRef} from 'react'

//{
//     "small": 2,
//     "medium": 3,
//     "large": 3
// }

interface AddToBasketProps {
  product: Product,
  onCancel: () => void,
  onSubmit: (data: Record<string,number>) => void
}

const AddToBasket = (props: AddToBasketProps) => {
  const {product} = props

  const formRef = useRef<ProFormInstance>(null)

  const changeVariantCount = (size: ProductSize, variance: number) => {
    if (formRef.current) {
      const oldValue = formRef.current.getFieldValue([size])
      const newObject = {}
      newObject[size] = (oldValue | 0) + variance
      newObject[size] = newObject[size] < 0 ? 0 : newObject[size]
      formRef.current.setFieldsValue(newObject)
    }
  }

  return (
    <ModalForm
      formRef={formRef}
      title="Add Coffee"
      visible
      modalProps={{
        onCancel: props.onCancel
      }}
      onFinish={async (values) => {
        console.log(values)
        props.onSubmit(values)
        message.success('Success');
        //return true;
      }}
    >
      {product.variants.map((item, index) => {
          return (
              <ProForm.Group key={index} >
                <p>£{item.price}</p>
                <ProFormDigit
                  width="xs"
                  name={[item.size]}
                  placeholder="qty"
                  addonBefore={<MinusCircleOutlined onClick={() => changeVariantCount(item.size, -1)}/>}
                  addonAfter={<PlusCircleOutlined onClick={() => changeVariantCount(item.size, 1)}/>}
                />
                <p>{item.size} - {item.calories} Calories</p>
              </ProForm.Group>
          )
        }
      )}
      {/*<InputNumber min={1} max={10} defaultValue={1}/>*/}
      {/*<Button onClick={() => onVariantSelected(item, element,)}>Add Select Coffee?</Button>*/}
    </ModalForm>
  )
}

export default AddToBasket


// FUNCTIONAL
// const Counter = () => {
//   const [count, setCount] = React.useState(0);
//
//   React.useEffect(() => setCount((currentCount) => currentCount + 1), []);
//
//   const handleIncrement = () => setCount((currentCount) => currentCount + 1);
//
//   const handleDecrement = () => setCount((currentCount) => currentCount - 1);
//
//   return (
//     <div className="counter">
//       <h1 className="count">{count}</h1>
//
//       <button type="button" onClick={handleIncrement}>
//         Increment
//       </button>
//       <button type="button" onClick={handleDecrement}>
//         Decrement
//       </button>
//     </div>
//   );
// }
//
//
// //EXACTLY THE SAME - CLASS
// class Counter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//   }
//
//   componentDidMount() {
//     this.setState({ count: this.state.count + 1 });
//   }
//
//   handleIncrement = () => {
//     this.setState({ count: this.state.count + 1 });
//   };
//
//   handleDecrement = () => {
//     this.setState({ count: this.state.count - 1 });
//   };
//
//   render() {
//     return (
//       <div className="counter">
//         <h1 className="count">{this.state.count}</h1>
//
//         <button type="button" onClick={this.handleIncrement}>
//           Increment
//         </button>
//         <button type="button" onClick={this.handleDecrement}>
//           Decrement
//         </button>
//       </div>
//     );
//   }
// }

