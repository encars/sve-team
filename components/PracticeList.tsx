"use client";

import getPlayersByPracticeId from "@/actions/getPlayersByPracticeId";
import { Practice } from "@prisma/client";

interface PracticeListProps {
    practice: Practice;
};

const PracticeList: React.FC<PracticeListProps> = async ({
    practice
}) => {
    const data = await getPlayersByPracticeId(practice.id);
    const players = data.users;
    
    return (
        <div>
            <h1>Practice List</h1>
        </div>
    );
};

export default PracticeList;