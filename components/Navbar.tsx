"use client";

import Image from "next/image";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "./ui/menubar";
import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface NavbarProps {
    user: User;
}

const Navbar: React.FC<NavbarProps> = ({
    user,
}) => {
    return (
        <nav className="fixed top-0 right-0 z-10 w-full bg-primary text-primary-foreground flex items-center justify-between p-2 border-b border-muted-foreground">
            <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2 ml-2">
                <Image src="/navbarLogo.svg" alt="Logo" height={32} width={32} />
                <p className="font-sans font-bold text-lg text-sveYellow">
                    SVE
                </p>
                <span className="font-sans font-bold text-lg text-sveBlue">
                    Floorball
                </span>
            </Link>

            {user && (
                <Menubar className="bg-primary border-none">
                    <MenubarMenu>
                        <MenubarTrigger>
                            <AlignJustify className="w-6 h-6" />
                        </MenubarTrigger>
                        <MenubarContent className="bg-blue-950 shadow-md mr-2 mt-2 foreground font-sans text-primary-foreground">
                            <MenubarItem>
                                <Link className="w-full" href="/dashboard">
                                    Dashboard
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link className="w-full" href="/matches">
                                    Matches
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
                            <MenubarItem>
                                <Link className="w-full" href="/playbook">
                                    Playbook
                                </Link>
                            </MenubarItem>
                            <MenubarSeparator className="bg-muted-foreground" />
                            <MenubarItem>
                                <Link className="w-full" href="/profile">
                                    Your Profile
                                </Link>
                            </MenubarItem>
                            <MenubarSeparator className="bg-muted-foreground" />
                            {user.role === "COACH" && (
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