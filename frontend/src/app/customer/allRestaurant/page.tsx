import { cardData } from '../../dbTemplate/cardData'
import CardComponent from '@/components/CardComponent'
export default function allFavorite() {
    return (
        <main className="flex min-h-screen flex-col items-center p-4">
            <header className="self-center flex w-full max-w-[1144px] items-start justify-between mt-4 px-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                <h1 className="text-black text-4xl font-semibold leading-[50.4px] self-center grow shrink basis-auto my-auto">
                    All Restaurant
                </h1>
                <a
                    href="/customer/restaurant"
                    className="text-red-600 text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center border bg-white w-[95px] pl-6 pr-6 py-2 rounded-3xl border-solid border-red-600 max-md:px-5">
                    back
                </a>
            </header>
            <div className="flex flex-wrap gap-4 w-[80%] px-5 mt-6">
                {cardData.map((card, index) => (
                    <div key={index} className="flex-none w-1/4 min-w-[150px] max-w-[200px]">
                        <CardComponent uri={card.uri} name={card.name} starNumber={card.starNumber} likes={true} />
                    </div>
                ))}
            </div>
        </main>
    )
}