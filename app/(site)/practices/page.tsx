import getAllPractices from "@/actions/getAllPractices";
import AllPractices from "@/components/AllPractices";

const MatchesPage = async () => {
    const practices = await getAllPractices();

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-bold text-2xl text-primary-foreground">
                    Practice Schedule
                </h1>
                <p className="text-base text-muted-foreground">
                    Improving is the key to success
                </p>
            </div>

            <AllPractices practices={practices} />
        </main>
    )
}

export default MatchesPage;