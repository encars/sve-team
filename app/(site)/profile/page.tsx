import getCurrentUser from "@/actions/getCurrentUser";
import UserProfile from "@/components/UserProfile";
import { redirect } from "next/navigation";

export default async function Profile() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/");
    };

    return (
        <main className="pt-16 h-screen bg-primary p-2 overflow-y-hidden">
            <UserProfile currentUser={currentUser} />
        </main>
    );
}