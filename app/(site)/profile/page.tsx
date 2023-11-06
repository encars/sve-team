import getUser from "@/actions/getUser";
import UserAvatar from "@/components/UserAvatar";
import UserProfile from "@/components/UserProfile";

export default async function Profile() {
    const user = await getUser();

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col items-center space-y-2 p-4">
                <UserAvatar user={user!} />
                <h1 className="text-primary-foreground text-xl">
                    {user!.displayName}
                </h1>
                <h3 className="text-muted-foreground text-base">
                    {user!.name}
                </h3>
            </div>    

            <UserProfile currentUser={user} />
        </main>
    );
}