"use client";

import Image from "next/image";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "./ui/menubar";
import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface NavbarProps {
    currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser,
}) => {
    return (
        <nav className="fixed top-0 right-0 z-10 w-full bg-primary text-primary-foreground flex items-center justify-between p-2 border-b border-muted-foreground">
            <Link href={currentUser ? "/dashboard" : "/"} className="flex items-center justify-start space-x-2 ml-2">
                <Image src="/floorball.svg" alt="Logo" height={32} width={32} />
                <p>
                    SVE Floorball
                </p>
            </Link>

            {currentUser && (
                <Menubar className="bg-primary border-none">
                    <MenubarMenu>
                        <MenubarTrigger>
                            <AlignJustify className="w-6 h-6" />
                        </MenubarTrigger>
                        <MenubarContent className="bg-blue-950 border-none shadow-md mr-2 mt-2 foreground text-primary-foreground">
                            <MenubarItem>
                                <Link className="w-full" href="/dashboard">
                                    Dashboard
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link className="w-full" href="/matches">
                                    Match Schedule
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link className="w-full" href="/practices">
                                    Practice Schedule
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link className="w-full" href="/roster">
                                    Team Roster
                                </Link>
                            </MenubarItem>
                            <MenubarSeparator className="bg-muted-foreground" />
                            <MenubarItem>
                                <Link className="w-full" href="/profile">
                                    Your Profile
                                </Link>
                            </MenubarItem>
                            <MenubarSeparator className="bg-muted-foreground" />
                            {currentUser.role === "COACH" && (
                                <>
                                    <MenubarItem>
                                        <Link className="w-full" href="/admin">
                                            Admin Panel
                                        </Link>
                                    </MenubarItem>
                                    <MenubarSeparator className="bg-muted-foreground" />
                                </>
                            )}
                            <MenubarItem>
                                <Button variant="destructive" className="w-full" onClick={() => signOut()}>
                                    Sign out
                                </Button>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            )}
        </nav>
    );
};

export default Navbar;