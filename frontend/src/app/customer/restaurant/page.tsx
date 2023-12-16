import React from "react";
import { CardComponent } from "./_components/CardComponent";
import CategoryCard from "./_components/CategoryCard";
import { getCardData, getFavoriteData, getCategoryData } from "./_components/actions";
const CustomerHome = () => {
  const cardData = getCardData();
  const categoryData = getCategoryData();
  const favoriteData = getFavoriteData();
  return (
    <>
      <header className="self-center flex w-full max-w-[90%] justify-between mt-4 px-5 max-md:max-w-full max-md:flex-wrap">
        <h1 className="text-black text-3xl font-semibold self-center grow shrink basis-auto my-auto">
          Favorite Restaurant
        </h1>
        <a
          href="/customer/allFavorite"
          className="text-red-600 text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center border pl-6 pr-6 py-2 rounded-3xl border-solid border-red-600 max-md:px-5"
        >
          View All
        </a>
      </header>
      <div className="self-center w-full max-w-[84%] mt-9 px-5 max-md:max-w-full overflow-x-auto flex gap-5 whitespace-nowrap">
        {favoriteData.map((card, index) => (
          <div
            key={index}
            className="flex-none w-[calc(25%-1.25rem)] min-w-[175px] max-w-[250px]"
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
      <header className="self-center flex w-full max-w-[90%] items-start justify-between mt-4 px-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <h1 className="text-black text-3xl font-semibold self-center grow shrink my-auto">
          Top Restaurant
        </h1>
        <a
          href="/customer/all"
          className="text-red-600 text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center border pl-6 pr-6 py-2 rounded-3xl border-solid border-red-600"
        >
          View All
        </a>
      </header>
      <div className="self-center w-full max-w-[84%] mt-9 px-5 max-md:max-w-full overflow-x-auto flex gap-5 whitespace-nowrap">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex-none w-[calc(25%-1.25rem)] min-w-[175px] max-w-[250px]"
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
      <header className="self-center flex w-full max-w-[90%] items-start justify-between mt-4 px-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <h1 className="text-black text-3xl font-semibold self-center grow shrink basis-auto my-auto">
          Category
        </h1>
        <a
          href="/customer/all"
          className="text-red-600 text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center border pl-6 pr-6 py-2 rounded-3xl border-solid border-red-600 max-md:px-5"
        >
          View All
        </a>
      </header>
      <div className="self-center w-full max-w-[80%] mt-9 px-5 max-md:max-w-full overflow-x-auto flex gap-5 whitespace-nowrap ">
        {categoryData.map((category, index) =>
          <div
            key={index}
            className="flex-none min-w-[100px] max-w-[200px]"
          >
            <CategoryCard
              uri={category.uri}
              name={category.name}
            />
          </div>)}
      </div>
    </>
  );
};

export default CustomerHome;
