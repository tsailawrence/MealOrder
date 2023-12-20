// components/CardComponent.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryProps } from '@/lib/types/db';
const CategoryCard: React.FC<CategoryProps> = ({ id,categoryName,categoryImage }) => {
    return (
        <Link href={`/customer/${id}`} >
            <section className="flex grow basis-[0%] flex-col items-stretch self-start">
                <div className="flex flex-col items-center">
                    <div className="aspect-square overflow-hidden rounded-full w-[190px] text-center shadow-lg">
                        <Image
                            src={categoryImage}
                            alt="Your Image Description"
                            width={160}
                            height={160}
                            loading="lazy"
                            className="w-full h-full object-contain object-center"
                        />
                    </div>
                    <div className="w-[190px] text-center">
                        <h2 className="text-xl font-bold pt-4">
                            {categoryName}
                        </h2>
                    </div>
                </div>
            </section>
        </Link>
    );
};

export default CategoryCard;