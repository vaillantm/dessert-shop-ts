
export const EmptyCart = () => {
  return (
    <div className="bg-white p-4 rounded-lg md:ml-10 md:w-[500px] md:h-[280px]">
      <h2 className="text-2xl text-Red font-bold mb-4">Your Cart(0)</h2>
      <div className="flex flex-col items-center gap-4 mb-4">
      <img src="images/illustration-empty-cart.svg" alt="" />
      <p className="text-[14px] text-Rose-500 font-medium">Your added items will appear here</p>

      </div>
    </div>
  )
}


