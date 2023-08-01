"use client";

import { Practice as PracticeType } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import Practice from "./Practice";

interface AllPracticesProps {
    practices: PracticeType[];
};

const AllPractices: React.FC<AllPracticesProps> = ({
    practices
}) => {
    return (
        <section className="flex flex-col space-y-3 p-4 text-primary bg-sveYellowDarker">
            {practices.map((practice) => (
                <Practice key={practice.id} practice={practice} />
            ))}
        </section>
    );
};

export default AllPractices;