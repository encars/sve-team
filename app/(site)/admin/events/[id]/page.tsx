import getCurrentUser from "@/actions/getCurrentUser";
import EditEventForm from "@/components/EditEventForm";
import { redirect } from "next/navigation";

const EventPage = async ({ params }: { params: { id: string } }) => {
    const currentUser = await  getCurrentUser();

    if (!currentUser || currentUser.role !== "COACH") {
        redirect("/");
    };
    
    return (
        <main className="pt-16 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-sans font-bold text-2xl text-primary-foreground">
                    Event Page {params.id}
                </h1>
                <p className="font-sans text-base text-muted-foreground">
                    This is the event page for event {params.id}
                </p>
            </div>

            <div className="bg-sveYellowDarker p-2 flex flex-col space-y-2">
                <EditEventForm />
            </div>
        </main>
    );
};

export default EventPage;