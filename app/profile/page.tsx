import getCurrentUser from "@/actions/getCurrentUser";
import UserProfile from "@/components/UserProfile";

export default async function Profile() {
    const currentUser = await getCurrentUser();

    return (
        <main className="pt-16 h-screen bg-primary p-2 overflow-y-hidden">
            <UserProfile currentUser={currentUser} />
        </main>
    );
}