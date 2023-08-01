import getRoster from "@/actions/getRoster";
import FullRoster from "@/components/FullRoster";

const RosterPage = async () => {
    const roster = await getRoster();

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-sans font-bold text-2xl text-primary-foreground">
                    Your Team Roster
                </h1>
                <p className="font-sans text-base text-muted-foreground">
                    Know your team. Know your players.
                </p>
            </div>

            <FullRoster roster={roster} />
        </main>
    )
}

export default RosterPage;