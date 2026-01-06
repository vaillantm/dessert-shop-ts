import { Button } from "./Button"
import { QuantityButton } from "./QuantityButton"
export const Products = ({product,addToCart,increaseQuantity, decreaseQuantity,cart}) => {
  const {name, image, category,price} = product

  const cartProduct = cart.find(item => item.name === product.name)
  return (
      <div className="mb-4 ">
        <div className="relative z-0 mb-6">
        <picture>
           <source srcSet={image.tablet} media="(min-width: 768px)" />
          <img className="rounded-lg" src={image.mobile} alt="image product" />
        </picture>
        {
          !cartProduct?(
            <Button
              product={product}
              addToCart={addToCart}
              
            />
          ):(
             <QuantityButton
              product={cartProduct}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            /> 
          )
        }

        
        </div>

        <div>
          <p className="text-Rose-500 text-[14px]">{category}</p>
          <h2 className="text-product font-medium text-rose-950">{name}</h2>
          <p className="text-Red font-medium">${price}</p>
          
        </div>
      </div>
    
  )
}


