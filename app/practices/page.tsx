import getCurrentUser from "@/actions/getCurrentUser";
import getAllPractices from "@/actions/getAllPractices";
import AllPractices from "@/components/AllPractices";

const MatchesPage = async () => {
    const currentUser = await getCurrentUser();
    const practices = await getAllPractices();

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-sans font-bold text-2xl text-primary-foreground">
                    Your Team Practices
                </h1>
                <p className="font-sans text-base text-muted-foreground">
                    Ready to get better?
                </p>
            </div>

            <AllPractices practices={practices} />
        </main>
    )
}

export default MatchesPage;