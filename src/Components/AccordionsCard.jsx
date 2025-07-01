import React, { useState } from "react";
import { useGlobalContext } from "../Utils/Contex/ApiContext";
import Veg from "../assets/Veg_symbol.svg";
import NonVeg from "../assets/Non_veg_symbol.svg";

const AccordionsCard = ({ info ,isLast }) => {
  const [isMore,setIsMoare] = useState(false)
  const { cdn } = useGlobalContext();
  const { name, price, imageId, description, isVeg, defaultPrice } = info;
  const rating = info.ratings.aggregatedRating;

  
  

  return (
    <div className={"relative max-w-[100%] flex justify-between py-6 ml-3 mr-3 font-gilroy "+ (isLast ? "" : "border-b-1 border-gray-300")}>
      <div className="flex flex-col justify-center mt-2  ">
        <img className=" w-[20px]" src={isVeg ? Veg : NonVeg} />
        <p className="font-bold text-[18px] text-gray-600">{name}</p>
        <p className="font-bold">₹{Number(price || defaultPrice) / 100}</p>
        {rating.ratingCountV2 && (
          <div className=" flex items-center gap-0.5 text-[12px]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
            >
              <rect width="14" height="14" fill="white" />
              <path
                d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z"
                fill="#1BA672"
              />
            </svg>

            <span className="font-bold">
              <span className="text-green-500">{rating.rating}</span>(
              {rating.ratingCountV2})
            </span>
          </div>
        )}
        
        
        <p className=" text-gray-500 font-medium text-wrap  mt-2 ">{isMore ? description : (description?.length > 180 ? description?.slice(0,180)  : description  )|| name}
         {description && description?.length  > 150 && <span onClick={()=>setIsMoare(!isMore)} className={"text-gray-500 font-bold cursor-pointer " + (isMore ? "hidden" : "")}>...more</span>}</p>

          
       

      </div>
      <div className="relative flex justify-center items-center pl-2">
        <img
          src={cdn + imageId}
          className="min-w-[150px] h-[150px] rounded-2xl"
          alt=""
        />
        <button className="rounded-xl shadow-2xs border border-gray-300 text-green-600 bg-white text-wrap font-bold px-10 py-2 absolute -bottom-2 ">ADD</button>
      </div>
    </div>
  );
};

export default AccordionsCard;
