// components/CardComponent.js
import React from 'react';
import Image from 'next/image';

type CategoryProps = {
    uri: string;
    name: string;
};

const CategoryCard: React.FC<CategoryProps> = ({ uri, name }) => {
    return (
        <section className="flex grow basis-[0%] flex-col items-stretch self-start">
            <div className="flex flex-col items-center">
                <div className="aspect-square overflow-hidden rounded-full w-[190px] text-center">
                    <Image
                        src={uri}
                        alt="Your Image Description"
                        width={160}
                        height={160}
                        layout="responsive"
                        objectFit="contain"
                        objectPosition="center"
                        loading="lazy"
                    />
                </div>
                <div className="w-[190px] text-center">
                    <h2 className="text-xl font-bold pt-4">
                        {name}
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default CategoryCard;