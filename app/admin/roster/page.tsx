import getRoster from "@/actions/getRoster";
import CreatePlayer from "@/components/CreatePlayer";
import EditPlayers from "@/components/EditPlayers";
import PositionOverview from "@/components/PositionOverview";

const AdminRosterPage = async () => {
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
                <CreatePlayer />
                <EditPlayers players={players} />
            </div>
        </main>
    );
};

export default AdminRosterPage;