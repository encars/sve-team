import getUser from "@/actions/getUser";
import UserProfile from "@/components/UserProfile";

export default async function Profile() {
    const user = await getUser();

    return (
        <main className="pt-16 h-screen bg-primary p-2 overflow-y-hidden">
            <UserProfile currentUser={user} />
        </main>
    );
}