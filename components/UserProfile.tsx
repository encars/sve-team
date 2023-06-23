"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

interface UserProfileProps {
    currentUser: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({
    currentUser,
}) => {
    const router = useRouter();

    if (!currentUser) {
        router.push("/");
        toast({
            title: "You are not logged in",
            description: "You are not logged in, please log in to view this page",
            variant: "destructive"
        })
    }

    return (
        <section className="flex flex-col space-y-2 p-2">
            <div className="flex flex-col items-center">
                <UserAvatar user={currentUser!} />
                <h1 className="text-primary-foreground text-xl">
                    {currentUser!.displayName}
                </h1>
                <h3 className="text-muted-foreground text-base">
                    {currentUser!.name}
                </h3>

                {/* TODO: turn into link to edit profile */}
                <Button variant="secondary" className="mt-2">
                    Edit profile
                    <ChevronRight size={18} />
                </Button>
            </div>

            <div>
                
            </div>
        </section>
    );
};

export default UserProfile;