
export const ProductsInCart = ({cart,removeProduct}) => {

  const subTotal = cart.price * cart.quantity

  return (
    <div className="">
      <div className="flex justify-between mb-4 items-center mt-4">
      

      <div className="flex flex-col">
         <p className="text-[14px] text-Rose-500 font-medium">{cart.name}</p>
        <div className="flex gap-3 text-[14px]">
            <p className="text-Red font-medium">{cart.quantity}x</p>
            <p className="text-Rose-400">@${cart.price}</p>
            <p className="text-Rose-500 font-medium">${subTotal}</p>
        </div>
      </div>

      <div className="border rounded-full border-Rose-400 items-center flex p-1.5 cursor-pointer" onClick={()=>removeProduct(cart.name)}>
        <img src="images/icon-remove-item.svg" alt="" />
      </div>
      

      </div>
      <hr className="text-Rose-300" />
      
    </div>
  )
}


