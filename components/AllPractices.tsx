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
        <section className="flex flex-col space-y-2 p-2">
            <div className="flex items-center justify-between mx-1">
                <Link href="/dashboard" className={buttonVariants({ variant: "secondary" })}>
                    <ArrowLeft size={18} />
                </Link>

                <h1 className="grow text-center text-primary-foreground text-2xl">
                    All Practices
                </h1>

                <div className="w-12" />
            </div>

            <div className="flex flex-col space-y-2 p-1">
                {practices.map((practice) => (
                    <Practice key={practice.id} practice={practice} />
                ))}
            </div>
        </section>
    );
};

export default AllPractices;