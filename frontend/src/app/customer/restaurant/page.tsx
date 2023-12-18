"use client";
import React from "react";
import { Heart } from "lucide-react";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { CardComponent } from "./_components/CardComponent";
import CategoryCard from "./_components/CategoryCard";
import { getCardData, getFavoriteData, getRestaurantCategoryData, lineBinding } from "./_components/actions";
import { CategoryProps, RestaurantCard } from "@/lib/types/db";
import { useSearchParams } from 'next/navigation';

const CustomerHome = () => {
  const [cookies, setCookie] = useCookies(['refreshToken', 'accessToken', '__session', 'senderId']);
  const [cardData, setCardData] = useState<RestaurantCard[] | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryProps[] | null>(null);
  const [favoriteData, setFavoriteData] = useState<RestaurantCard[] | null>(null); // [1
  const [loading, setLoading] = useState(true);
  const { __session: accessToken = '' } = cookies;
  useEffect(() => {
    getCardData(accessToken)
      .then(data => {
        setCardData(data); // Assuming 'data' is the array of orders
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
    getRestaurantCategoryData(accessToken)
      .then(data => {
        setCategoryData(data); // Assuming 'data' is the array of orders
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
    getFavoriteData(accessToken)
      .then(data => {
        setFavoriteData(data); // Assuming 'data' is the array of orders
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
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
        {loading ? <div>Loading...</div> :
        (favoriteData && favoriteData.length!=0 ? favoriteData.map((card, index) => (
          <div
            key={index}
            className="flex-none w-[calc(25%-1.25rem)] min-w-[175px] max-w-[250px]"
          >
            <CardComponent
              id={card.id}
              uri={card.storeImage? card.storeImage : "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0&width=100"}
              name={card.name}
              starNumber={card.favoriteCount}
              likes={true}
            />
          </div>
        )) :
          <a
            href="/customer/all" className="flex text-center p-5 text-lg font-semibold text-gray-700 bg-gray-100 rounded-md shadow-lg gap-3">
            <Heart fill='red' /> Add Favorite Restaurant Now
          </a>)}
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
        {loading ? <div>Loading...</div> :
          (cardData ? (cardData.map((card, index) => (
            <div
              key={index}
              className="flex-none w-[calc(25%-1.25rem)] min-w-[175px] max-w-[250px]"
            >
              <CardComponent
                id={card.id}
                uri={card.storeImage?card.storeImage:"https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0&width=100"}
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
        {categoryData && categoryData.map((category, index) =>
          <div
            key={index}
            className="flex-none min-w-[100px] max-w-[200px]"
          >
            <CategoryCard
              id={category.id}
              categoryImage={category.categoryImage ? category.categoryImage : "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0&width=100"}
              categoryName={category.categoryName}
            />
          </div>)}
      </div>
    </>
  );
};

export default CustomerHome;
