"use client";
import React from "react";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { CardComponent } from "./_components/CardComponent";
import CategoryCard from "./_components/CategoryCard";
import { getCardData, getFavoriteData, getCategoryData, getRestaurantCategoryData, lineBinding } from "./_components/actions";
import { CategoryProps, RestaurantCard } from "@/lib/types/db";
import { get } from "https";
import { useSearchParams } from 'next/navigation';

const CustomerHome = () => {
  const [cookies, setCookie] = useCookies(['refreshToken', 'accessToken', '__session', 'senderId']);
  const [cardData, setCardData] = useState<RestaurantCard[] | null>(null);
  const [categoryDat, setCategoryData] = useState<CategoryProps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { __session: accessToken = '' } = cookies;
  // const cardData= getCardData(accessToken);
  // console.log(cardData);
  const categoryData = getCategoryData();
  const favoriteData = getFavoriteData();
  useEffect(() => {
    getCardData(accessToken)
      .then(data => {
        setCardData(data); // Assuming 'data' is the array of orders
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setError(err);
        setLoading(false);
      });
    getRestaurantCategoryData(accessToken)
      .then(data => {
        setCategoryData(data); // Assuming 'data' is the array of orders
        console.log(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setError(err);
        setLoading(false);
      });
  }, [accessToken]);

  const params = useSearchParams();
  const senderId = params.get('sender_id');
  
  if (senderId) {
    if (!cookies?.senderId) {
      lineBinding(accessToken, senderId);
      setCookie('senderId', senderId);
    }
  }

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
              id={card.id}
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
        {/* {loading ? <div>Loading...</div> :
          (
            cardData ? {cardData.map((card, index) => (
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
            ))
          } : <div>No data</div>
          )} */}
        {loading ? <div>Loading...</div> :
          (cardData ? (cardData.map((card, index) => (
            <div
              key={index}
              className="flex-none w-[calc(25%-1.25rem)] min-w-[175px] max-w-[250px]"
            >
              <CardComponent
                id={card.id}
                uri={card.uri}
                name={card.name}
                starNumber={card.favoriteCount}
                likes={card.liked}
              />
            </div>
          ))
          ) : <div>No data</div>
          )}
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
        {categoryDat && categoryDat.map((category, index) =>
          <div
            key={index}
            className="flex-none min-w-[100px] max-w-[200px]"
          >
            <CategoryCard
              id={category.id}
              categoryImage={category.categoryImage ? category.categoryImage : ''}
              categoryName={category.categoryName}
            />
          </div>)}
      </div>
    </>
  );
};

export default CustomerHome;
