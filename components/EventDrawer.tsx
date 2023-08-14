"use client";

import { Book, Edit, MapPin, Swords, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Drawer } from "vaul";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Match, Practice } from "@prisma/client";
import Link from "next/link";

interface EventDrawerProps {
    initialMatches: Match[];
    initialPractices: Practice[];
};

const EventDrawer: React.FC<EventDrawerProps> = ({
    initialMatches,
    initialPractices
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [matches, setMatches] = useState<Match[]>(initialMatches);
    const [practices, setPractices] = useState<Practice[]>(initialPractices);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const type = searchParams.get("type");

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);

        const currentSearchQuery = event.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (currentSearchQuery) {
            params.set("search", currentSearchQuery);
        } else {
            params.delete("search");
        }

        router.push(pathname + "?" + params.toString());
    }, [router, pathname, searchParams]);

    const handleFilterChange = useCallback((filterName: string, filterValue: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.get(filterName) === filterValue || filterValue === "all"
            ? params.delete(filterName)
            : params.set(filterName, filterValue);

        router.push(pathname + "?" + params.toString());
    }, [router, pathname, searchParams]);

    const handleSearch = () => {
        const search = searchQuery.toLowerCase();
        let filteredMatches = initialMatches;
        let filteredPractices = initialPractices;

        switch (type) {
            case "match":
                filteredMatches = initialMatches.filter((match) => match.homeTeam.toLowerCase().includes(search) || match.awayTeam.toLowerCase().includes(search) || match.location.toLowerCase().includes(search));
                break;
            case "practice":
                filteredPractices = initialPractices.filter((practice) => practice.location.toLowerCase().includes(search));
                break;
            default:
                filteredMatches = initialMatches.filter((match) => match.homeTeam.toLowerCase().includes(search) || match.awayTeam.toLowerCase().includes(search) || match.location.toLowerCase().includes(search));
                filteredPractices = initialPractices.filter((practice) => practice.location.toLowerCase().includes(search));
                break;
        }

        setMatches(filteredMatches);
        setPractices(filteredPractices);
    }

    return (
        <Drawer.Root open={isDrawerOpen}>
            <Drawer.Trigger asChild onClick={() => setIsDrawerOpen(true)}>
                <button className="flex items-center justify-center rounded-md shadow-md bg-blue-500 text-white w-10 h-10 transition duration-300 hover:scale-105 cursor-pointer">
                    <Edit className="w-6 h-6" />
                </button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-sveYellowDarker flex flex-col max-h-[85vh] rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 bg-sveYellowDarker rounded-t-[10px] flex-1">
                        <Drawer.Title className="flex items-center justify-between font-sans font-bold text-2xl mb-4">
                            <div className="flex items-center">
                                <Edit className="w-6 h-6 mr-2" />
                                Update an Event
                            </div>
                            <X onClick={() => setIsDrawerOpen(false)} className="w-8 h-8 mr-2 text-red-600 transition duration-300 cursor-pointer hover:scale-105" />
                        </Drawer.Title>

                        <div className="flex flex-col space-y-4 text-primary mb-4">
                            <div className="flex items-center justify-between space-x-4">
                                <h3 className="text-lg font-sans font-semibold">
                                    Search
                                </h3>
                                <Input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="for a team or a location...." />
                            </div>

                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-sans font-semibold">
                                    or filter by
                                </h3>

                                <RadioGroup className="flex">
                                    <Label htmlFor="match" className="flex flex-col items-center justify-between rounded-md border-2 border-primary bg-primary text-primary-foreground p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-white">
                                        <RadioGroupItem value="match" id="match" className="sr-only" onClick={() => handleFilterChange("type", "match")} checked={type === "match"} />
                                        <span>
                                            Matches
                                        </span>
                                    </Label>
                                    <Label htmlFor="practice" className="flex flex-col items-center justify-between rounded-md border-2 border-primary bg-primary text-primary-foreground p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-white">
                                        <RadioGroupItem value="practice" id="practice" className="sr-only" onClick={() => handleFilterChange("type", "practice")} checked={type === "practice"} />
                                        <span>
                                            Practices
                                        </span>
                                    </Label>
                                    <Label htmlFor="all" className="flex flex-col items-center justify-between rounded-md border-2 border-primary bg-primary text-primary-foreground p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-white">
                                        <RadioGroupItem value="all" id="all" className="sr-only" onClick={() => handleFilterChange("type", "all")} checked={type === "all"} />
                                        <span>
                                            All
                                        </span>
                                    </Label>
                                </RadioGroup>
                            </div>
                        </div>

                        <Button onClick={handleSearch} variant="blue" className="mb-4">
                            Search
                        </Button>

                        {/* Display Results */}
                        <div className="flex flex-col space-y-2 p-4 rounded-md shadow-md bg-sveYellow font-sans">
                            {matches.map((match) => (
                                <Link key={match.id} href={`/admin/events/${match.id}`} className="flex items-center justify-between p-2 rounded-md border-2 border-sveYellowDarker transition duration-300 hover:scale-105">
                                    <div className="flex items-center font-semibold">
                                        <Swords className="h-4 w-4 mr-2" />
                                        {match.homeTeam} - {match.awayTeam}
                                    </div>
                                    <div className="flex items-center text-right">
                                        {match.location}
                                        <MapPin className="h-4 w-4 ml-2" />
                                    </div>
                                </Link>
                            ))}
                            {practices.map((practice) => (
                                <Link key={practice.id} href={`/admin/events/${practice.id}`} className="flex items-center justify-between p-2 rounded-md border-2 border-sveYellowDarker transition duration-300 hover:scale-105">
                                    <div className="flex items-center font-semibold">
                                        <Book className="h-4 w-4 mr-2" />
                                        {practice.date.toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "2-digit"
                                        })}
                                    </div>
                                    <div className="flex items-center text-right">
                                        {practice.location}
                                        <MapPin className="h-4 w-4 ml-2" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default EventDrawer;