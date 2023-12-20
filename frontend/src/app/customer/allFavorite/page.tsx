'use client';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getAllFavoriteStore } from './_components/actions';
import { CardComponent } from './_components/CardComponent';
import { RestaurantCard } from '@/lib/types/db';
import { Heart } from 'lucide-react';
export default function AllFavorite() {
  const [cookies] = useCookies(['refreshToken', 'accessToken', '__session']);
  const [favoriteData, setFavoriteData] = useState<RestaurantCard[] | null>(
    null
  ); // [1
  const [loading, setLoading] = useState(true);
  const { __session: accessToken = '' } = cookies;
  useEffect(() => {
    getAllFavoriteStore(accessToken)
      .then(data => {
        setFavoriteData(data); // Assuming 'data' is the array of orders
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <header className="self-center flex w-full max-w-[90%] items-start justify-between mt-4 px-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <h1 className="text-4xl font-semibold leading-[50.4px] grow shrink">
          Favorite Restaurant
        </h1>
        <a
          href="/customer/all"
          className="text-sm font-semibold border pl-6 pr-6 py-2 rounded-3xl mx-1"
        >
          See All
        </a>
        <a
          href="/customer/restaurant"
          className="text-red-600 text-sm font-semibold border pl-6 pr-6 py-2 rounded-3xl border-red-600"
        >
          back
        </a>
      </header>
      <div className="flex flex-wrap gap-4 w-[80%] px-5 mt-6">
        {loading ? (
          <div> Loading... </div>
        ) : favoriteData && favoriteData.length != 0 ? (
          favoriteData.map((card, index) => (
            <div
              key={index}
              className="flex-none w-1/4 min-w-[150px] max-w-[200px]"
            >
              <CardComponent
                id={card.id}
                uri={
                  card.storeImage
                    ? card.storeImage
                    : 'https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0&width=100'
                }
                name={card.name}
                starNumber={card.favoriteCount}
                likes={card.liked}
              />
            </div>
          ))
        ) : (
          <a
            href="/customer/all"
            className="flex text-center p-5 text-lg font-semibold text-gray-700 bg-gray-100 rounded-md shadow-lg gap-3"
          >
            <Heart fill="red" /> Add Favorite Restaurant Now
          </a>
        )}
      </div>
    </main>
  );
}
