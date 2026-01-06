
export const ConfirmOrder = ({cart}) => {

    const subTotal = cart.price * cart.quantity
  return (
    <div className="">
        <div className="flex justify-between mb-4 items-center mt-4">
        <img className="size-10 rounded-md" src={cart.image.thumbnail} alt="thumbnail" />

        <div className="flex flex-col">
            <p className="text-[14px] text-Rose-500 font-medium">{cart.name}</p>
            <div className="flex gap-3 text-[14px]">
                <p className="text-Red font-medium">{cart.quantity}x</p>
                <p className="text-Rose-400">@${cart.price}</p>
                
            </div>
        </div>

        <div>
            <p className="text-Rose-900 font-medium">${subTotal}</p>
        </div>
        

        </div>
        <hr className="text-Rose-300" />

        
      
    </div>
  )
}


