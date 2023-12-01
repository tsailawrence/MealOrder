import { cardData } from "../../dbTemplate/cardData";
import { CardComponent} from "@/components/CardComponent";
export default function allFavorite() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <header className="self-center flex w-full max-w-[90%] items-start justify-between mt-4 px-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <h1 className="text-4xl font-semibold leading-[50.4px] grow shrink">
          Your Favorite Restaurant
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
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex-none w-1/4 min-w-[150px] max-w-[200px]"
          >
            <CardComponent
              uri={card.uri}
              name={card.name}
              starNumber={card.starNumber}
              likes={true}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
