import getPracticeById from "@/actions/getPracticeById";
import PracticeDetail from "@/components/PracticeDetail";
import { Practice } from "@prisma/client";
import { notFound } from "next/navigation";

interface PracticeProps {
    params: {
        practiceId: string;
    }
}

export default async function Practice({ params }: PracticeProps) {
    const practice: Practice | null = await getPracticeById(params.practiceId);

    if (!practice) {
        return notFound();
    }

    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <PracticeDetail practice={practice} />
        </main>
    )
}