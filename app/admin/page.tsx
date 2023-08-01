import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, Users2 } from "lucide-react";

import getCurrentUser from "@/actions/getCurrentUser";

const AdminPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "COACH") {
        redirect("/");
    }

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-sans font-bold text-2xl text-primary-foreground">
                    Hey Coach!
                </h1>
                <p className="font-sans text-base text-muted-foreground">
                    This is the admin page. You can add, edit, and delete players, matches, and practices here.
                </p>
            </div>

            <div className="bg-sveYellow p-4 flex flex-col space-y-4">
                <Link href="/admin/roster" className="flex items-center justify-between p-2 bg-sveYellowDarker rounded-md font-sans font-bold text-xl transition duration-300 hover:scale-[103%]">
                    <Users2 className="ml-2 h-6 w-6" />
                    Manage Roster 
                    <ArrowRight className="mr-2 h-6 w-6" />
                </Link>
                <Link href="/admin/events" className="flex items-center justify-between p-2 bg-sveYellowDarker rounded-md font-sans font-bold text-xl transition duration-300 hover:scale-[103%]">
                    <Calendar className="ml-2 h-6 w-6" />
                    Manage Events
                    <ArrowRight className="mr-2 h-6 w-6" />
                </Link>
            </div>
        </main>
    );
};

export default AdminPage;