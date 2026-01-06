
export const QuantityButton = ({product, increaseQuantity, decreaseQuantity}) => {
  return (
    <div className="absolute z-10  bottom-[-20px] left-20 md:md:left-15">
        <div className="bg-Red w-[150px] p-2 rounded-full border border-Rose-500 flex gap-2 text-[14px] justify-around">
                <img className="cursor-pointer" src="images/icon-decrement-quantity.svg" alt="" onClick={()=>decreaseQuantity(product.name)} />
                <button className=" font-medium text-Rose-50">{product.quantity}</button>
                <img className="cursor-pointer" src="images/icon-increment-quantity.svg" alt="" onClick={()=>increaseQuantity(product.name)} />
        </div>
    </div>
  )
}


