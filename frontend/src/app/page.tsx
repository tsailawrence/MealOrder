import Header from "@/components/Header";
import ChooseRoleDialog from "@/components/ChooseRoleDialog";
import { auth, currentUser } from "@clerk/nextjs";

type HomePageProps = {
  searchParams: {
    userRole?: string;
  };
};

export default async function Home({
  searchParams: { userRole },
}: HomePageProps) {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();

  if (userId) {
    // Query DB for user specific information or display assets only to logged in users
  }

  // Get the User object when you need access to the user's information
  const user = await currentUser();

  console.log("user", user?.id);
  // Use `user` to render user details or create UI elements
  return (
    <>
      <div>
        <Header />
      </div>
      {/* <ChooseRoleDialog /> */}
    </>
  );
}
