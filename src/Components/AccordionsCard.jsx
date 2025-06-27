import React from 'react'
import { useGlobalContext } from '../Utils/Contex/ApiContext'
import Veg from '../assets/Veg_symbol.svg'
import NonVeg from '../assets/Non_veg_symbol.svg'

const AccordionsCard = ({info}) => {
    const{cdn}=useGlobalContext()
    const {name,price,imageId ,description,isVeg,defaultPrice} = info
    const rating = info.ratings.aggregatedRating.rating
  return (
    <div className='flex font-gilroy'>
     <div className=''>
            <p>{name}</p>
            <p>₹{Number(price || defaultPrice)/100}</p>
            <span>{rating}</span>
            <p>{description}</p>
     </div>
    <img src={Veg}/>
     <img src={cdn+imageId}/>
    
    </div>
  )
}

export default AccordionsCard