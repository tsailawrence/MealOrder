import ChooseRoleDialog from "@/components/ChooseRoleDialog";
import { auth, currentUser } from "@clerk/nextjs";

export default async function Home() {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();
  // Get the User object when you need access to the user's information
  const user = await currentUser();
  // Use `user` to render user details or create UI elements
  // console.log("user", user);

  return (
    <>
      {/* 現在預設會直接打開 ChooseRoleDialog */}
      <ChooseRoleDialog />
    </>
  );
}
