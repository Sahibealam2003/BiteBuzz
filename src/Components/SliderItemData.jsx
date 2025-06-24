import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Utils/Contex/ApiContext'
import { useParams } from 'react-router-dom'
import Skeleton from './Skeleton'
import TopRes from './TopRes'
import ResNavbar from './ResNavbar'

const SliderItemData = () => {
  const[itemData,setItemData]=useState([])
  const[description,setDescription]= useState('')
  console.log(itemData);
  

  
  
  const{lat,long}=useGlobalContext()
const {itemId,text}=useParams()
  useEffect(()=>{
      async function getData() {
        const res =await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&collection=${itemId}&tags=${text}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`)
        const data = await res.json()
        console.log(data);
        setDescription(data.data?.cards[0]?.card?.card?.description)
        setItemData(data.data?.cards.splice(2))
      }
      getData()
  },[])
  return (
    <div>

    <ResNavbar/>
    <h2 className='text-5xl font-bold ml-10 mt-6'>{text}</h2>
    <p className='text-[20px] ml-12 mt-2'>{description}</p>
    {!itemData.length > 0 ? <Skeleton/> :(

      <div className='grid grid-cols-4 w-[95%] gap-6 ml-14 mt-10'>
        {itemData.map((item,index)=>{
      
          
            return(
              <div key={index}>
              {/* item.card.card.info.id */}
          <TopRes size={'lg'} cuisines={item.card.card.info.cuisines} slaString={item.card.card.info.sla.slaString} avgRating={item.card.card.info.avgRating} name={item.card.card.info.name} subHeader={item.card.card.info?.aggregatedDiscountInfoV3?.subHeader || ""} header={item.card.card.info?.aggregatedDiscountInfoV3?.header || ""} key={item.card.card.info.id} areaName={item.card.card.info.areaName} imageId={item.card.card.info.cloudinaryImageId} />

              </div>
            )
        })}
      </div>

    )}
    </div>
  )
}

export default SliderItemData