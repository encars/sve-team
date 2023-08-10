"use client";

import { Practice } from "@prisma/client";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";

interface PracticeProps {
    practice: Practice;
};

const Practice: React.FC<PracticeProps> = ({
    practice
}) => {
    const router = useRouter();

    const showPractice = (practiceId: string) => {
        router.push(`/practices/${practiceId}`);
    }

    return (
        <div onClick={() => showPractice(practice.id)} className="flex flex-col py-2 text-primary bg-sveYellow rounded-md cursor-pointer transition duration-300 hover:scale-105">
                <div className="flex justify-between items-center mx-4 mb-2">
                    <h1 className="flex items-center gap-2 font-mono text-lg">
                        <MdDateRange size={22} />
                        {format(new Date(practice.date), 'dd.MM.yy')}
                    </h1>
                    <h1 className="flex items-center gap-2 font-mono text-lg">
                        {practice.time}
                        <IoMdTime size={22} />
                    </h1>
                </div>

                <div className="flex justify-between items-center mx-4">
                    <small className="flex items-center gap-2 font-mono">
                        <MapPin size={18} />
                        {practice.location}
                    </small>

                    <small className="flex items-center gap-2 font-mono">
                        {practice.userIds.length}
                        <IoIosPeople size={18} />
                    </small>
                </div>

                
            </div>
    );
};

export default Practice;