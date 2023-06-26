interface PracticeProps {
    params: {
        practiceId: string;
    }
}

export default async function Practice({ params }: PracticeProps) {
    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <h1 className="text-white">
                Practice {params.practiceId}
            </h1>
        </main>
    )
}