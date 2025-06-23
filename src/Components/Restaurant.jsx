
import React, { useEffect, useState } from 'react'
import ResNavbar from './ResNavbar'
import { useGlobalContext } from '../Utils/Contex/ApiContext'


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
                    <div key={item.info.id}>
                      {/* For Image */}
                      <div className='w-[250px] relative'>
                        <img src={cdn + item.info.cloudinaryImageId} className='h-[150px] w-[100%] rounded-2xl' />
                        <p className='absolute bottom-1 left-2 text-white font-bold'><span>{item.info.aggregatedDiscountInfoV3?.header}</span> <span>{item.info.aggregatedDiscountInfoV3?.subHeader}</span></p>

                      </div>

                      {/* For Image Heading */}
                      <div>
                        <h2 className='font-bold'>{item.info.name}</h2>
                        <p className='flex text-sm'>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="9"
                              fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                            />
                            <path
                              d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                              fill="white"
                            />
                            <defs>
                              <linearGradient
                                id="StoreRating20_svg__paint0_linear_32982_71567"
                                x1="10"
                                y1="1"
                                x2="10"
                                y2="19"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#21973B" />
                                <stop offset="1" stopColor="#128540" />
                              </linearGradient>
                            </defs>
                          </svg> &nbsp; {item.info.avgRating} • {item.info.sla.slaString} </p>
                        <p className='text-sm text-gray-400'>{item.info.cuisines.join(", ").length > 30 ? item.info.cuisines.join(", ").slice(0, 30) + "..." : item.info.cuisines.join(", ")}</p>
                        <p className='text-sm text-gray-400'>{item.info.areaName}</p>
                      </div>

                    </div>
                  )
                })}
              </div>

            </div>
          }

        </div>}



    </div>
  )
}

export default Restaurant
