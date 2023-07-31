import getCurrentUser from "@/actions/getCurrentUser";
import getAllPractices from "@/actions/getAllPractices";
import AllPractices from "@/components/AllPractices";

const MatchesPage = async () => {
    const currentUser = await getCurrentUser();
    const practices = await getAllPractices();

    return (
        <main className="pt-16 h-screen bg-primary p-2 overflow-y-auto">
            <AllPractices practices={practices} />
        </main>
    )
}

export default MatchesPage;