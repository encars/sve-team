import { categories } from "@/lib/constants";
import Link from "next/link";

const DrillCategories = () => {
    return (
        <section className="grid grid-cols-2 gap-3 p-4 text-primary bg-sveYellowDarker">
            {Object.values(categories).map((category) => (
                    <Link key={category.name} href={category.link} className="flex flex-col space-y-2">
                        <div className="flex items-center rounded-md p-4 bg-sveYellow">
                            <category.icon className="h-6 w-6 mr-2" />
                            <h2 className="font-sans text-lg font-bold">
                                {category.name}
                            </h2>
                        </div>
                    </Link>
                ))}
        </section>
    );
};

export default DrillCategories;