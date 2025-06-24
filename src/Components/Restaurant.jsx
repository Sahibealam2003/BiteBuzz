
import React, { useEffect, useState } from 'react'
import ResNavbar from './ResNavbar'
import { useGlobalContext } from '../Utils/Contex/ApiContext'
import TopRes from './TopRes'
import { useNavigate } from 'react-router-dom'


const Restaurant = () => {
  const navigate=useNavigate()
  const [sliderData, setSLiderData] = useState([])
  const [topRes, setTopRes] = useState([])
  const [topTitle, setTopTitle] = useState('')
  const [onlineDelResTitle, setOnlineDelResTitle] = useState('')
  const [onlineDelRes, setOnlineDelRes] = useState([])



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
        const res = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        let apiData = await res.json()
        setSLiderData(apiData.data?.cards[0]?.card?.card?.imageGridCards?.info)
        setTopRes(apiData.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setTopTitle(apiData.data?.cards[1]?.card?.card?.header?.title)
        setOnlineDelResTitle(apiData.data?.cards[2]?.card?.card?.title)
        setOnlineDelRes(apiData.data?.cards[4].card?.card?.gridElements?.infoWithStyle?.restaurants)  
          console.log(apiData);
          
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
        <div className=' w-[80vw] h-auto mx-auto mt-10 bg-white'>
          <div className='w-[80vw] mx-auto mt-10 bg-white'>

            <div className='flex justify-between items-center mb-4'>
              <p className='font-bold text-xl'>What's on your mind?</p>

              <div className='flex gap-4'>
                <div
                  className='cursor-pointer px-2 py-1 rounded-full hover:bg-gray-200'
                  onClick={() => scrollFn("left")}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div
                  className='cursor-pointer px-2 py-1 rounded-full hover:bg-gray-200'
                  onClick={() => scrollFn("right")}
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>


            <div className='relative'>


              <div className='absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none' />


              <div className='absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none' />


              <div id='slider' className='flex gap-4 overflow-x-scroll hide-scrollbar pb-5'>
                {sliderData.map((item) => {
                  let str= item.action.link;
                  str= str.slice(35,40);
                  
                  let text=item.action.text

                  return(
                    <img onClick={()=>navigate(`/slider-data/${str}/${text}`)}
                    key={item.id}
                    src={cdn + item.imageId}
                    className='h-[150px] cursor-pointer rounded-lg transition-transform duration-200 transform hover:scale-105'
                    alt="slider"
                  />
                  )
                }
                  
                )}
              </div>
            </div>
          </div>

          <hr className="border border-[rgba(2,6,12,0.05)]" />

          {/* For Top Res */}
          {topRes &&
            <div className='w-[80vw] mx-auto mt-5 bg-white mb-10  '>
              <div className='flex justify-between'>
                <div className='font-bold text-xl'>{topTitle}</div>
                <div className='flex gap-4'>
                  <div className='px-1.5 rounded-[50%] hover:bg-gray-300' onClick={() => scrollFn2("left")}><i className="fa-solid fa-arrow-left"></i></div>
                  <div className='px-1.5 rounded-[50%] hover:bg-gray-300' onClick={() => scrollFn2("right")}><i className="fa-solid fa-arrow-right"></i></div>
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

          <hr className="border border-[rgba(2,6,12,0.05)]" />
          {/* for Grid */}


          {onlineDelRes &&
            <div className='w-[82vw] mx-auto mt-10 bg-white  '>
              <div className='flex justify-between'>
                <div className='font-bold text-xl mb-6'>{onlineDelResTitle}</div>
              </div>

              <div id='slider2' className='grid grid-cols-4 gap-8'>
                {onlineDelRes.map((item) => {
                  return (
                    <TopRes
                      size={"lg"}
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
        </div>

      }



    </div>
  )
}

export default Restaurant
