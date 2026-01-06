import { Products } from "./components/Products"
import {EmptyCart} from "./components/EmptyCart"
import { ProductsInCart } from "./components/ProductsInCart"
import { useState } from "react"
import { useEffect } from "react"
import { useMemo } from "react"
import { ConfirmOrder } from "./components/ConfirmOrder"
import data from '../data.json/'

function App() {
const [products] = useState(data)
const [cart, setCart] = useState([])
const [showConfirm, setShowConfirm] = useState(false)

const cartTotal = useMemo(() => cart.reduce((total,item) => total + (item.quantity * item.price),0),[cart])

const addToCart =(item)=>{
const newItem = { ...item, quantity: 1 }
  setCart([...cart, newItem])
  
}

const increaseQuantity=(name)=>{
    const uptdateCart = cart.map(item=>{
      if(name === item.name){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })

    setCart(uptdateCart)
    console.log("hola")
}

const decreaseQuantity=(name)=>{
    const uptdateCart = cart.map(item=>{
      if(name === item.name){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })

    setCart(uptdateCart)
}

const removeProduct=(name)=>{

  const uptdateCart = cart.filter(product => product.name !== name)

  setCart(uptdateCart)

}

const newOrder = ()=>{
  setCart([])
}
  const isEmpty = cart.length === 0
  return (
    <>
      <main className="bg-rose-50 min-h-screen grid place-content-center md:p-4 ">
          <h1 className="text-3xl font-bold text-Rose-900 mb-6">Desserts</h1>
        <section className="w-[320px] md:w-full md:flex">
          
            <div className="md:grid md:grid-cols-3 md:gap-2">
              

            {
              products.map(product =>
                <Products
                key={product.name}
                product={product}
                addToCart={addToCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                cart={cart}
                />
              )

            }

            </div>
            {isEmpty?(
              <EmptyCart/> 

            ):(
              <div className="bg-white p-4 rounded-lg  md:ml-10 md:w-[500px] md:max-h-[500px] md:overflow-auto">
                <h2 className="text-2xl text-Red font-bold mb-4">
                  Your Cart({cart.length})
                </h2>
                {cart.map(product => (
                  <ProductsInCart
                    cart={product}
                    key={product.name}
                    removeProduct={removeProduct}
                  />
                ))}
                <div className="flex justify-between mt-6 items-center">
                  <h3 className="text-Rose-500 font-medium text-product">Order Total</h3>
                  <p className="text-2xl font-bold text-Rose-900">${cartTotal}</p>
                </div>

                <div className="bg-Rose-50 mt-4 p-2 flex gap-2 text-[14px] justify-center text-Rose-500 rounded-lg">
                  <img src="images/icon-carbon-neutral.svg" alt="" />
                  <p>This is a <span className="text-Rose-900 font-medium">carbon-neutral</span> delivery</p>
                </div>

                
                  <button className="text-Rose-50 bg-Red w-full h-10 rounded-full mt-6 cursor-pointer text-[14px] font-medium" onClick={() => setShowConfirm(true)}>Confirm Order</button>
                
            </div>
  
              
            )
          
          }
          {showConfirm &&(
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-[320px] md:w-[600px] md:max-h-[500px] md:overflow-auto">
              <img src="images/icon-order-confirmed.svg" alt="" />
              <div className="w-[200px] mt-4 mb-6">
                <h2 className="text-4xl text-Rose-900 font-bold mb-2">Order Confirmed</h2>
                <p className="text-[14px] text-Rose-400">We hope you enjoy your food!</p>
              </div>

              <div className="bg-Rose-50 p-2 rounded-lg">
                  {
                    cart.map(product=>(
                      <ConfirmOrder
                        cart={product}
                      />
                    ))
              
                  }
              <div className="flex justify-between mt-4 items-center">
                  <p className="text-Rose-500 font-medium text-product">Order total</p>
                  <p className="text-2xl font-bold text-Rose-900">${cartTotal}</p>
              </div>

          </div>
          <button className="bg-Red w-full rounded-full text-Rose-50 font-medium h-10 mt-6 text-[14px] cursor-pointer" onClick={() => {setShowConfirm(false); newOrder()}} >Star New Order</button>
          </div>

          </div>

          )}
          
         </section>
      </main>




    </>
  )
}

export default App
