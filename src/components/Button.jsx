
export const Button = ({addToCart, product}) => {
  return (
    <div className="absolute z-10  bottom-[-20px] left-20 md:left-15">
        <div className="bg-white w-[150px] p-2 rounded-full border border-Rose-500 flex gap-2 text-[14px] justify-center cursor-pointer">
        <img src="images/icon-add-to-cart.svg" alt="" />
        <button className=" font-medium text-Rose-900 cursor-pointer" onClick={()=>addToCart(product)}>Add to Cart</button>
        </div>
    </div>
  )
}


