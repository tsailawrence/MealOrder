import ChooseRoleDialog from "@/components/ChooseRoleDialog";
import { auth, currentUser } from "@clerk/nextjs";
const MerchantSetupPage = async () => {
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
    return <ChooseRoleDialog props={user} />;
};

export default MerchantSetupPage;
