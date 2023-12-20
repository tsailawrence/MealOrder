import React from "react";
import Link from "next/link";


export default async function Home() {
  // Get the userId from auth() -- if null, the user is not logged in
  return (
    <>
      {/* 現在預設會直接打開 ChooseRoleDialog */}
      {/* <ChooseRoleDialog props={user}/> */}
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-col items-center p-4 pt-20 mx-auto w-[95%] grow">
          <h1 className="text-3xl font-bold text-center">
            Welcome to Foody!
          </h1>
          <Link href="/login">
            <span className="text-blue-500 underline">Go to Restaurant</span>
          </Link>
        </main>
      </div>
    </>
  );
}
