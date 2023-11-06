import DrillCategories from "@/components/DrillCategories";

const PlaybookPage = async () => {
    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-bold text-2xl text-primary-foreground">
                    Team Playbook
                </h1>
                <p className="text-base text-muted-foreground">
                    Know your plays.
                </p>
            </div>

            <div className="flex flex-col space-y-4">
                <DrillCategories />
            </div>
        </main>
    );
};

export default PlaybookPage;