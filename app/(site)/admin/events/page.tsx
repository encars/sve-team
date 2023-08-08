import getCurrentUser from "@/actions/getCurrentUser"
import AddEvent from "@/components/AddEvent";
import UpdateEvent from "@/components/UpdateEvent";
import { redirect } from "next/navigation";

const AdminEventsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "COACH") {
        redirect("/");
    }

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto felx flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-sans font-bold text-2xl text-primary-foreground">
                    Manage Events
                </h1>
                <p className="font-sans text-base text-muted-foreground">
                    Add, edit, and delete events here.
                </p>
            </div>

            <div className="bg-sveYellowDarker p-2 flex flex-col space-y-2">
                <AddEvent />
                <UpdateEvent />
            </div>
        </main>
    )
}

export default AdminEventsPage;