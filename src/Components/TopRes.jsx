import React from 'react'
import { useGlobalContext } from '../Utils/Contex/ApiContext'
import { useNavigate, } from 'react-router-dom'


const TopRes = ({
  resId, header, subHeader, imageId,
  name, avgRating, slaString, cuisines,
  areaName, size
}) => {
  const { cdn } = useGlobalContext();
  const navigate = useNavigate();


  return (

      <div className={`${size === 'lg' ? "" : ""} font-medium`}>
        <div
          
          className={`relative cursor-pointer ${
            size === "sm"
              ? "w-[300px] hover:scale-90 transition-transform duration-200"
              : "w-[250px] transition-transform duration-200 hover:scale-105"
          }`}
        >
          <img
            src={cdn + imageId}
            alt=""
            className={`${
              size === "sm" ? "h-[200px]" : "h-[160px]"
            } w-[100%] rounded-2xl`}
          />
          {header && (
            <p className="absolute bottom-1 left-2 text-white font-bold">
              {header + (subHeader || "")}
            </p>
          )}
        </div>

        <div className="mt-2">
          <h2 className="font-bold">
            {name.length > 25 ? name.slice(0, 25) + "..." : name}
          </h2>
          <p className="flex text-sm">
            {/* Star Icon */}
            ...
            &nbsp; {avgRating} • {slaString}
          </p>
          <p className="text-sm text-gray-400">
            {cuisines.join(", ").length > 30
              ? cuisines.join(", ").slice(0, 30) + "..."
              : cuisines.join(", ")}
          </p>
          <p className="text-sm text-gray-400">{areaName}</p>
        </div>
      </div>

  );
};

export default TopRes
