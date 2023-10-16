import getPlayersByPracticeId from "@/actions/getPlayersByPracticeId";
import getPracticeById from "@/actions/getPracticeById";
import PracticeDetail from "@/components/PracticeDetail";
import { Practice } from "@prisma/client";
import { notFound } from "next/navigation";

const PracticePage = async ({ params }: { params: { practiceId: string } }) => {
    const practice: Practice | null = await getPracticeById(params.practiceId);
    const players = await getPlayersByPracticeId(params.practiceId)

    if (!practice) {
        return notFound();
    }

    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <PracticeDetail practice={practice} players={players} currentUser={currentUser!} />
        </main>
    )
}

export default PracticePage;