import getPlayersByPracticeId from "@/actions/getPlayersByPracticeId";
import getPracticeById from "@/actions/getPracticeById";
import getUser from "@/actions/getUser";
import PracticeDetail from "@/components/PracticeDetail";
import { Practice } from "@prisma/client";
import { notFound } from "next/navigation";

const PracticePage = async ({ params }: { params: { practiceId: string } }) => {
    const user = await getUser();

    const practice: Practice | null = await getPracticeById(params.practiceId);
    const players = await getPlayersByPracticeId(params.practiceId)

    if (!practice) {
        return notFound();
    }

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <PracticeDetail practice={practice} players={players} currentUser={user!} />
        </main>
    )
}

export default PracticePage;