import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Utils/Contex/ApiContext";
import ResNavbar from "./ResNavbar";
import RiseLoader2 from "./RiseLoader2";
import Accordions from "./Accordions";

const Menu = () => {
  const { itemId } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [resData, setResData] = useState({});
  const [carData, setCarData] = useState([]);
  const { lat, long, cdn } = useGlobalContext();

  // Scroll function for carousel
  function scrollFn(dir) {
    const scrollAmt = 200;
    const car = document.getElementById("car");
    if (car) {
      car.scrollBy({
        left: dir === "left" ? -scrollAmt : scrollAmt,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${itemId}&catalog_qa=undefined&submitAction=ENTER`
        );
        const data = await res.json();
          console.log(data);
          
        const allCards = data.data?.cards || [];

        // Extract REGULAR cards dynamically
        const regularSection = allCards.find((c) =>
          c.groupedCard?.cardGroupMap?.REGULAR
        );

        const allMenus =
          regularSection?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

        let arr = [...allMenus];

        if (arr[0]?.card?.card?.carousel) {
          setCarData(arr[0].card.card.carousel);
          arr = arr.slice(1);
        }

        setMenuData(arr.slice(0, arr.length - 2));
        setResData(arr[arr.length - 1]?.card?.card || {});
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    }

    if (lat && long && itemId) {
      getData();
    }
  }, [lat, long, itemId]);

  return (
    <div>
      <ResNavbar />

      {menuData.length === 0 ? (
        <RiseLoader2 />
      ) : (
        <div className="border w-[60vw] mx-auto mt-20 font-gilroy flex flex-col items-center">
          <div>
            <h1 className="font-extrabold text-3xl">
              {resData.name}
            </h1>
            <p className="text-gray-600 mt-4">{resData.completeAddress}</p>
          </div>

          <span className="mt-10 text-xl font-semibold mb-5">Menu</span>
          <hr className="w-[100%] border border-[rgba(2,6,12,0.05)]" />

          {/* Carousel - Top Picks */}
          {carData.length > 0 && (
            <div className="w-full mt-5">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold mb-2">Top Picks</p>
                <div className="flex gap-4">
                  <div
                    className="cursor-pointer px-2 py-1 rounded-full hover:bg-gray-200"
                    onClick={() => scrollFn("left")}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </div>
                  <div
                    className="cursor-pointer px-2 py-1 rounded-full hover:bg-gray-200"
                    onClick={() => scrollFn("right")}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </div>

              <div
                id="car"
                className="w-full flex overflow-x-auto gap-4 whitespace-nowrap hide-scrollbar mt-5"
              >
                {carData.map((item, index) => (
                  <div key={index} className="shrink-0">
                    <img
                      className="h-[250px] w-[250px] rounded-2xl"
                      src={cdn + item.dish.info.imageId}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accordion Menu Items */}
          <div className="w-full mt-8">
            {menuData.map((item, idx) => {
              const title = item.card?.card?.title;
              const items = item.card?.card?.itemCards;

              if (items) {
                return <Accordions key={idx} title={title} data={items} />;
              } else {
                return (
                  <p key={idx} className="text-gray-400 text-sm ml-2">
                    Nested UI
                  </p>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
