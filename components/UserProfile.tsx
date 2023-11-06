"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { GiCheckedShield, GiGoalKeeper, GiSoccerBall, GiStrikingBalls, GiWhistle } from "react-icons/gi";
import { FaBullseye, FaQuestion } from "react-icons/fa";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

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

const formSchema = z.object({
    displayName: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long").max(30).optional(),
});

const UserProfile: React.FC<UserProfileProps> = ({
    currentUser,
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: currentUser!.displayName,
            email: currentUser!.email || "No email set",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);

            const res = await axios.patch("/api/players/update", values);

            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: "Your changes have been saved",
                    variant: "success"
                });
                router.refresh();
            } else {
                toast({
                    title: "An error occurred",
                    description: "An error occurred while trying to save your changes",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "An error occurred",
                description: "An error occurred while trying to save your changes",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 p-4 text-primary bg-sveYellowDarker">
                <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Display Name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name that will be displayed to other users
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the email that will be used to contact you
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••" type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the password that will be used to login to your account
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-around shadow-md rounded-md p-4">
                    <div className="flex flex-col">
                        <Label htmlFor="roles" className="sr-only">
                            Role
                        </Label>
                        <div className="flex items-center space-x-2">
                            {roleIcons[currentUser!.role]}
                            <span>
                                {currentUser!.role}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <Label htmlFor="positions" className="sr-only">
                            Position
                        </Label>
                        <div className="flex items-center space-x-2">
                            {positionIcons[currentUser!.position ? currentUser!.position : "NONE"]}
                            <span>
                                {currentUser!.position}
                            </span>
                        </div>
                    </div>
                </div>
                <small className="mt-3 mb-8">
                    This is the role and position that will be displayed to other users. These can be changed by a coach.
                </small>

                <Button type="submit" disabled={isLoading}>
                    Save changes
                </Button>
            </form>
        </Form>
    );
};

export default UserProfile;