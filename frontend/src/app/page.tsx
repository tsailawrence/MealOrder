import React from "react";
import { auth, currentUser } from "@clerk/nextjs";
import ChooseRoleDialog from "@/components/ChooseRoleDialog";


export default async function Home() {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();

  const theUser = await currentUser();
  // Get the User object when you need access to the user's information
  const user = {
    userId,
    firstName: theUser?.firstName ?? '',
    lastName: theUser?.lastName ?? '',
    emailAddress: theUser?.emailAddresses?.[0]?.emailAddress ?? null,
    phoneNumber: theUser?.phoneNumbers?.[0]?.phoneNumber ?? null,
    imageUrl: theUser?.imageUrl ?? null,
    authenticationMethod: theUser?.externalAccounts[0]?.verification?.strategy,
  };

  return (
    <>
      {/* 現在預設會直接打開 ChooseRoleDialog */}
      <ChooseRoleDialog props={user}/>
    </>
  );
}
