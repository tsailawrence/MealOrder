import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// type Product = {
//   id: string;
//   category: string;
//   name: string;
//   price: string;
//   images: string[];
// };

type RestaurantCardProps = {
  id: string;
  name: string;
  stars: number;
  images: string[];
};

const RestaurantCard = ({ id, name, stars, images }: RestaurantCardProps) => {
  return (
    <Link
      href={"/"}
      className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg"
    >
      <Card className="rounded-lg border-2">
        <CardContent className="pt-4">
          <div className="aspect-square relative bg-foreground/5 dark:bg-background rounded-lg">
            <Image
              src={images?.[0]}
              alt=""
              fill
              className="aspect-square object-cover rounded-lg transition-all duration-300 hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div>
            <p className="font-semibold text-lg">{name}</p>
            <p className="text-sm text-primary/80">{stars}</p>
          </div>
          <div className="flex items-center justify-between">{stars}</div>
        </CardFooter>
      </Card>
    </Link>
  );
};
