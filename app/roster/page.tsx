import getCurrentUser from "@/actions/getCurrentUser";
import getRoster from "@/actions/getRoster";
import FullRoster from "@/components/FullRoster";

const RosterPage = async () => {
    const currentUser = await getCurrentUser();
    const roster = await getRoster();

    return (
        <main className="pt-16 h-screen bg-primary p-2 overflow-y-auto">
            <FullRoster roster={roster} />
        </main>
    )
}

export default RosterPage;