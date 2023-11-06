"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import UserAvatar from "./UserAvatar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { GiCheckedShield, GiGoalKeeper, GiSoccerBall, GiStrikingBalls, GiWhistle } from "react-icons/gi";
import { FaBullseye, FaQuestion } from "react-icons/fa";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";

interface UserProfileProps {
    currentUser: User | null;
}

const roleIcons = {
    PLAYER: <GiSoccerBall size={24} />,
    COACH: <GiWhistle size={24} />,
};

const positionIcons = {
    GOLIE: <GiGoalKeeper size={24} />,
    CENTER: <FaBullseye size={24} />,
    FORWARD: <GiStrikingBalls size={24} />,
    DEFENDER: <GiCheckedShield size={24} />,
    NONE: <FaQuestion size={24} />,
};

const UserProfile: React.FC<UserProfileProps> = ({
    currentUser,
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [displayName, setDisplayName] = useState(currentUser!.displayName);
    const [email, setEmail] = useState(currentUser!.email ? currentUser!.email : "No email set");
    const [hasChanges, setHasChanges] = useState(false);

    if (!currentUser) {
        router.push("/");
        toast({
            title: "You are not logged in",
            description: "You are not logged in, please log in to view this page",
            variant: "destructive"
        });
    };

    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayName(e.target.value);
        setHasChanges(true);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setHasChanges(true);
    };

    const handleSave = async () => {
        setIsLoading(true);

        await axios.post("/api/players/update", {
            displayName,
            email,
        })
            .then(() => {
                toast({
                    title: "Profile updated",
                    description: "Your profile has been updated",
                    variant: "default"
                });
                setHasChanges(false);
            })
            .catch(() => {
                toast({
                    title: "Error",
                    description: "There was an error updating your profile",
                    variant: "destructive"
                })
            })
            .finally(() => {
                setIsLoading(false);
                router.refresh();
            });
    };

    return (
        <section className="flex flex-col p-2">
            <div className="flex flex-col items-center mb-4">
                <UserAvatar user={currentUser!} />
                <h1 className="text-primary-foreground text-xl">
                    {currentUser!.displayName}
                </h1>
                <h3 className="text-muted-foreground text-base">
                    {currentUser!.name}
                </h3>
            </div>

            <div className="flex flex-col space-y-6 mb-8">
                <div className="flex flex-col space-y-3">
                    <Label htmlFor="name" className="text-primary-foreground">
                        Username
                    </Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={currentUser!.name}
                        disabled
                        className="text-muted-foreground border-muted-foreground"
                    />
                    <small className="text-muted-foreground">
                        This is your account name, it cannot be changed
                    </small>
                </div>

                <div className="flex flex-col space-y-3">
                    <Label htmlFor="displayName" className="text-primary-foreground">
                        Display Name
                    </Label>
                    <Input
                        type="text"
                        name="displayName"
                        id="displayName"
                        value={displayName}
                        onChange={handleDisplayNameChange}
                        className="text-muted-foreground border-muted-foreground"
                    />
                    <small className="text-muted-foreground">
                        This is the name that will be displayed to other users
                    </small>
                </div>

                <div className="flex flex-col space-y-3">
                    <Label htmlFor="email" className="text-primary-foreground">
                        Email
                    </Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="text-muted-foreground border-muted-foreground"
                    />
                    <small className="text-muted-foreground">
                        This is the email that will be used to contact you
                    </small>
                </div>
            </div>

            <div className="flex items-center justify-around border border-muted-foreground rounded-md p-4">
                <div className="flex flex-col">
                    <Label htmlFor="roles" className="text-primary-foreground sr-only">
                        Role
                    </Label>
                    <div className="flex items-center space-x-2 text-primary-foreground">
                        {roleIcons[currentUser!.role]}
                        <span className="text-muted-foreground">
                            {currentUser!.role}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <Label htmlFor="positions" className="text-primary-foreground sr-only">
                        Position
                    </Label>
                    <div className="flex items-center space-x-2 text-primary-foreground">
                        {positionIcons[currentUser!.position ? currentUser!.position : "NONE"]}
                        <span className="text-muted-foreground">
                            {currentUser!.position}
                        </span>
                    </div>
                </div>
            </div>
            <small className="text-muted-foreground mt-3 mb-8">
                This is the role and position that will be displayed to other users. These can be changed by a coach.
            </small>

            <Button onClick={() => handleSave()} variant="secondary" disabled={isLoading || !hasChanges}>
                Save changes
            </Button>
        </section>
    );
};

export default UserProfile;