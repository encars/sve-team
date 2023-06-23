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
                        <MenubarContent>
                            <MenubarItem>
                                <Link href="/dashboard">
                                    Dashboard
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href="/matches">
                                    Matches
                                </Link>
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>
                                <Link href="/profile">
                                    Profile
                                </Link>
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>
                                <Button className="w-full" onClick={() => signOut()}>
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