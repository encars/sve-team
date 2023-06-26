"use client";

import { formatDateAndTime } from "@/lib/dateUtils";
import { Practice } from "@prisma/client";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";

interface NextPracticeProps {
    practice: Practice;
}

const NextPractice: React.FC<NextPracticeProps> = ({
    practice
}) => {
    const router = useRouter();

    const date = new Date(practice.date);

    const { formattedDate, time } = formatDateAndTime(date);

    const showPractice = (practiceId: string) => {
        router.push(`/practices/${practiceId}`);
    }

    return (
        <section className="flex flex-col space-y-2 p-2">
            <div className="flex items-center justify-between mx-1">
                <h1 className="text-primary-foreground text-xl">
                    Next Practice:
                </h1>
            </div>

            <div onClick={() => showPractice(practice.id)} className="relative flex flex-col py-2 text-primary-foreground bg-blue-950 rounded-md cursor-pointer">
                <div className="flex justify-between items-center mx-4 mb-2">
                    <h1 className="flex items-center gap-2 text-primary-foreground font-mono text-lg">
                        <MdDateRange size={22} />
                        {formattedDate}
                    </h1>
                    <h1 className="flex items-center gap-2 text-primary-foreground font-mono text-lg">
                        {time}
                        <IoMdTime size={22} />
                    </h1>
                </div>

                <div className="flex justify-between items-center mx-4">
                    <small className="flex items-center gap-2 text-primary-foreground font-mono">
                        <MapPin size={18} />
                        {practice.location}
                    </small>

                    <small className="flex items-center gap-2 text-primary-foreground font-mono">
                        {practice.userIds.length}
                        <IoIosPeople size={18} />
                    </small>
                </div>

                
            </div>
        </section>
    );
};

export default NextPractice;