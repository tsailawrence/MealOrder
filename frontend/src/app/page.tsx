import React from "react";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  // Get the userId from auth() -- if null, the user is not logged in
  return (
    <>
      {/* 現在預設會直接打開 ChooseRoleDialog */}
      {/* <ChooseRoleDialog props={user}/> */}
      {/* <div className="flex flex-col min-h-screen">
        <main className="flex flex-col items-center p-4 pt-20 mx-auto w-[95%] grow">
          <h1 className="text-3xl font-bold text-center">
            Welcome to Foody!
          </h1>
          <Link href="/login">
            <span className="text-blue-500 underline">Go to Restaurant</span>
          </Link>
        </main>
      </div> */}
      <div className="flex min-h-screen">
      {/* Left Half - Image */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <Image
          src="/logo.png"
          alt="Descriptive Alt Text"
          width={500}
          height={500}
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-red-400 p-12 text-center">
        <h1 className="text-4xl text-white font-bold mb-4">Welcome to Foody !!</h1>
        <p className="mb-8 text-white ">Explore our amazing features and get started on your journey.</p>
        <Link href="/login">
            <span className="text-white underline text-2xl">Get Started</span>
          </Link>
      </div>
    </div>
    </>
  );
}
