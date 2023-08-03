import getCurrentUser from "@/actions/getCurrentUser";
import getRoster from "@/actions/getRoster";
import EditPlayers from "@/components/EditPlayers";
import PositionOverview from "@/components/PositionOverview";
import { redirect } from "next/navigation";

const AdminRosterPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "COACH") {
        redirect("/");
    }

    const players = await getRoster();

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-sans font-bold text-2xl text-primary-foreground">
                    Manage Roster
                </h1>
                <p className="font-sans text-base text-muted-foreground">
                    Add, edit, and delete players here.
                </p>                
            </div>

            <div className="bg-sveYellowDarker p-2 flex flex-col space-y-2">
                <PositionOverview players={players} />
                <EditPlayers players={players} />
            </div>
        </main>
    );
};

export default AdminRosterPage;