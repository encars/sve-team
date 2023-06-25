"use client";

import { Practice } from "@prisma/client";

interface NextPracticeProps {
    practice: Practice;
}

const NextPractice: React.FC<NextPracticeProps> = ({}) => {
    return (
        <section className="flex flex-col space-y-2 p-2">
            <div className="flex items-center justify-between mx-1">
                <h1 className="text-primary-foreground text-xl">
                    Next Practice:
                </h1>
            </div>

            
        </section>
    );
};

export default NextPractice;