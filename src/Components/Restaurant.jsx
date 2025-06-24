
import React, { useEffect, useState } from 'react'
import ResNavbar from './ResNavbar'
import { useGlobalContext } from '../Utils/Contex/ApiContext'
import TopRes from './TopRes'
import { useNavigate } from 'react-router-dom'
import BestData from './BestData'


const Restaurant = () => {
  const navigate = useNavigate()
  const [sliderData, setSLiderData] = useState([])
  const [topRes, setTopRes] = useState([])
  const [topTitle, setTopTitle] = useState('')
  const [onlineDelResTitle, setOnlineDelResTitle] = useState('')
  const [onlineDelRes, setOnlineDelRes] = useState([])
  const [bestPlace, setBestPalce] = useState([])
  const [bestPlaceTitle, setBestPalceTitle] = useState('')
  const[cuisines,setCuisines] = useState([])
  const[cuisinesTitle,setCuisinesTitle] = useState('')
  const [isExpanded, setIsExpanded] = useState(false);
  const[nearRes,setNearRes] = useState([])
  const[nearResTitle,setNearResTitle] = useState('')

console.log(nearRes);


const toggleShowMore = () => {
    setIsExpanded(!isExpanded);
  };

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
        setBestPalce(apiData.data?.cards[6]?.card?.card?.brands)
        setBestPalceTitle(apiData.data?.cards[6]?.card?.card?.title)
        setCuisines(apiData.data?.cards[7]?.card?.card?.brands)
        setCuisinesTitle(apiData.data?.cards[7]?.card?.card?.title)
        setNearRes(apiData.data?.cards[8]?.card?.card?.brands)
        setNearResTitle(apiData.data?.cards[8]?.card?.card?.title)
  
    
        
          



      } catch (error) {
        console.log(error)
      }

    }
    getData()
  }, [lat, long])

  return (
    <>
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
                  let str = item.action.link;
                  str = str.slice(35, 40);

                  let text = item.action.text
                    
                    
                  return (
                    <img onClick={() => navigate(`/slider-data/${str}/${text}`)}
                      key={item.id}
                      // item.id
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
                    <div key={item.info.id}>
                    {/* item.info.id */}
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
            </div>
                  )
                })}
              </div>

            </div>
          }

          <hr className="border border-[rgba(2,6,12,0.05)]" />
          {/* for Grid */}


          {onlineDelRes &&
            <div className='w-[82vw] mx-auto mt-10 bg-white mb-7 '>
              <div className='flex justify-between'>
                <div className='font-bold text-xl mb-6'>{onlineDelResTitle}</div>
              </div>

              <div id='slider2' className='grid grid-cols-4 gap-8'>
                {onlineDelRes.map((item) => {
                  
                  
                  return (
                    <div key={item.info.id} >
                    {/* item.info.id */}
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
                    </div>

                  )
                })}
              </div>

            </div>
          }


          <hr className="border border-[rgba(2,6,12,0.05)]" />

{/* For Cityes */}

          <div className='mt-5'>
            <h2 className='text-[25px] font-bold mb-5'>{bestPlaceTitle}</h2>
            <div className='grid grid-cols-4 gap-4' >
              {
                bestPlace && (isExpanded ===true ? bestPlace : bestPlace.slice(0,11)).map((item) => {
                  
                  return (
                    <>
                      <div key={item.text}>
                     <BestData text={item.text}/>
                        </div>
                    </>
                  )
                })
              }
              <button
              onClick={toggleShowMore}
               className='border-2 font-medium rounded-2xl text-orange-500 h-[60px] w-[80%]  border-gray-200 mt-2 flex items-center justify-center'>
                <p className=''>Show More</p>
                <svg
                  className={` mt-1 transition-transform duration-400 ${isExpanded ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
                </svg>
              </button>
            </div>

          </div>

{/* For cuisines*/}
     



          <div className='mt-5'>
            <h2 className='text-[25px] font-bold mb-5'>{cuisinesTitle}</h2>
            <div className='grid grid-cols-4 gap-4' >
              {
                cuisines && (isExpanded ===true ? cuisines : cuisines.slice(0,11)).map((item) => {
               
                    
                  return (
                    <>
                      <div key={item.text} >

                     <BestData text={item.text}/>

                      </div>
                    </>
                  )
                })
              }
              <button
              onClick={toggleShowMore}
               className='border-2 font-medium rounded-2xl text-orange-500 h-[60px] w-[80%]  border-gray-200 mt-2 flex items-center justify-center'>
                <p className=''>Show More</p>
                <svg
                  className={` mt-1 transition-transform duration-400 ${isExpanded ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
                </svg>
              </button>
            </div>

          </div>
{/* Near resturant */}

            
   <div className='mt-5'>
            <h2 className='text-[25px] font-bold mb-5'>{nearResTitle}</h2>
            <div className='grid grid-cols-4 gap-4' >
              {
                nearRes && nearRes.map((item) => {
               
                    
                  return (
                    <>
                      <div key={item.text} >

                     <BestData text={item.text}/>

                      </div>
                    </>
                  )
                })
              }
            
            </div>

          </div>

        </div>
      }




    </div>

    <footer>
      
    </footer>
</>

  )
}

export default Restaurant
