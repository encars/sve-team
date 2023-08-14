import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

const EventPage = async ({ params }: { params: { id: string } }) => {
    const currentUser = await  getCurrentUser();

    if (!currentUser || currentUser.role !== "COACH") {
        redirect("/");
    };
    
    return (
        <div>
            <h1>Event Page {params.id}</h1>
        </div>
    );
};

export default EventPage;