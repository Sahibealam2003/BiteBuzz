
import React, { useEffect, useState } from 'react'
import ResNavbar from './ResNavbar'
import { useGlobalContext } from '../Utils/Contex/ApiContext'
import TopRes from './TopRes'


const Restaurant = () => {
  const [sliderData, setSLiderData] = useState([])
  const [topRes, setTopRes] = useState([])
  const [topTitle, setTopTitle] = useState('')
  // console.log(sliderData);
  console.log(topRes);

  const { cdn, long, lat } = useGlobalContext()


  const scrollFn = (direction) => {

    const mySlider = document.getElementById("slider")
    const slideAmount = 200

    mySlider.scrollBy({
      left: direction === 'left' ? -slideAmount : slideAmount,
      behavior: 'smooth'
    })

  }

  const scrollFn2 = (direction) => {

    const mySlider2 = document.getElementById("slider2")
    const slideAmount = 200

    mySlider2.scrollBy({
      left: direction === 'left' ? -slideAmount : slideAmount,
      behavior: 'smooth'
    })

  }

  useEffect(() => {



    async function getData() {
      try {
        // console.log(lat, long)
        const res = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        let apiData = await res.json()
        setSLiderData(apiData.data?.cards[0]?.card?.card?.imageGridCards?.info)
        setTopRes(apiData.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setTopTitle(apiData.data?.cards[1]?.card?.card?.header?.title)

      } catch (error) {
        console.log(error)
      }

    }
    getData()
  }, [lat, long])

  return (
    <div className=' min-h-screen'>
      <ResNavbar />

      {sliderData &&
        <div className=' w-[80vw] mx-auto mt-10 bg-white'>
          <div className='flex justify-between'>
            <p className='font-bold'>What's on your mind?</p>

            <div className='flex gap-4'>
              <div onClick={() => scrollFn("left")}><i className="fa-solid fa-arrow-left"></i></div>
              <div onClick={() => scrollFn("right")}><i className="fa-solid fa-arrow-right"></i></div>
            </div>
          </div>


          <div id='slider' className='flex overflow-x-scroll hide-scrollbar pb-5'>

            {sliderData.map((item) => {
              return (
                <img className='h-[150px]' key={item.id} src={cdn + item.imageId} />
              )
            })}

          </div>
          <hr class="border border-[rgba(2,6,12,0.05)]" />

          {/* For Top Res */}
          {topRes &&
            <div className='w-[80vw] mx-auto mt-5 bg-white  '>
              <div className='flex justify-between'>
                <div className='font-bold'>{topTitle}</div>
                <div className='flex gap-4'>
                  <div onClick={() => scrollFn2("left")}><i className="fa-solid fa-arrow-left"></i></div>
                  <div onClick={() => scrollFn2("right")}><i className="fa-solid fa-arrow-right"></i></div>
                </div>
              </div>

              <div id='slider2' className='flex gap-3 overflow-scroll hide-scrollbar mt-5'>
                {topRes.map((item) => {
                  return (
                            <TopRes
  size={"sm"}
  cuisines={item.info.cuisines}
  slaString={item.info.sla.slaString}
  avgRating={item.info.avgRating}
  name={item.info.name}
  subHeader={item.info.aggregatedDiscountInfoV3?.subHeader}
  header={item.info.aggregatedDiscountInfoV3?.header}
  key={item.info.id}
  areaName={item.info.areaName}
  imageId={item.info.cloudinaryImageId}
/>

                        )
                })}
              </div>

            </div>
          }


        {}
        </div>
        
        }



    </div>
  )
}

export default Restaurant
