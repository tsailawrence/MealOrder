import React from "react";
import { cardData, categoryData } from "../../dbTemplate/cardData";
import CardComponent from "@/components/CardComponent";
import CategoryCard from "@/components/CategoryCard";
const CustomerHome = () => {
  return (
    <>
      <header className="self-center flex w-full max-w-[90%] items-start justify-between mt-4 px-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <h1 className="text-black text-2xl md:text-4xl font-semibold leading-[50.4px] self-center grow shrink basis-auto my-auto">
          Your Favorite Restaurant
        </h1>
        <a
          href="/customer/allFavorite"
          className="text-red-600 text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center border bg-white w-[95px] pl-6 pr-6 py-2 rounded-3xl border-solid border-red-600 max-md:px-5"
        >
          View All
        </a>
      </header>
      <div className="self-center w-full max-w-[80%] mt-9 px-5 max-md:max-w-full overflow-x-auto">
        <div className="flex gap-5 whitespace-nowrap">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex-none w-[calc(25%-1.25rem)] min-w-[200px] max-w-[275px]"
            >
              <CardComponent
                uri={card.uri}
                name={card.name}
                starNumber={card.starNumber}
                likes={card.likes}
              />
            </div>
          ))}
        </div>
      </div>
      <header className="self-center flex w-full max-w-[90%] items-start justify-between mt-4 px-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <h1 className="text-black text-4xl font-semibold leading-[50.4px] self-center grow shrink basis-auto my-auto">
          Top Restaurant
        </h1>
        <a
          href="/customer/allRestaurant"
          className="text-red-600 text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center border bg-white w-[95px] pl-6 pr-6 py-2 rounded-3xl border-solid border-red-600 max-md:px-5"
        >
          View All
        </a>
      </header>
      <div className="self-center w-full max-w-[80%] mt-9 px-5 max-md:max-w-full overflow-x-auto">
        <div className="flex gap-5 whitespace-nowrap">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex-none w-[calc(25%-1.25rem)] min-w-[200px] max-w-[275px]"
            >
              <CardComponent
                uri={card.uri}
                name={card.name}
                starNumber={card.starNumber}
                likes={card.likes}
              />
            </div>
          ))}
        </div>
      </div>
      <header className="self-center flex w-full max-w-[90%] items-start justify-between mt-4 px-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <h1 className="text-black text-4xl font-semibold leading-[50.4px] self-center grow shrink basis-auto my-auto">
          Top Category
        </h1>
        <a
          href="/customer/allRestaurant"
          className="text-red-600 text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center border bg-white w-[95px] pl-6 pr-6 py-2 rounded-3xl border-solid border-red-600 max-md:px-5"
        >
          View All
        </a>
      </header>
      <div className="self-center w-full max-w-[80%] mt-9 px-5 max-md:max-w-full overflow-x-auto">
        <div className="flex gap-5 whitespace-nowrap">
          {categoryData.map((category, index) => CategoryCard(category))}
        </div>
      </div>
    </>
  );
};

export default CustomerHome;
