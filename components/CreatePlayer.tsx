"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Drawer } from "vaul";
import { Plus, User, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1).max(255),
    displayName: z.string().min(1).max(255),
    number: z.string().min(0).max(2),
    password: z.string().min(8).max(255),
    role: z.enum(["PLAYER", "COACH"]),
    position: z.enum(["GOLIE", "DEFENDER", "CENTER", "FORWARD"]),
    isReferee: z.boolean(),
    license: z.string().min(0).max(255),
}).refine(data => (data.isReferee ? data.license !== "" : true), {
    message: "License is required for referees.",
    path: ["license"],
});

const CreatePlayer = () => {
    const router = useRouter();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            displayName: "",
            number: "",
            password: "",
            role: "PLAYER",
            position: "DEFENDER",
            isReferee: false,
            license: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);

            const res = await fetch("/api/admin/players/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error("Something went wrong.");
            }

            const data = await res.json();

            form.reset();
            setIsDrawerOpen(false);
            router.refresh();

            toast({
                title: `Player ${data.name} created!`,
                description: `Player ${data.name} has been created successfully.`,
                variant: "success",
            });
        } catch (err) {
            console.error(err);

            toast({
                title: "Something went wrong.",
                description: "Something went wrong while creating the player.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Drawer.Root open={isDrawerOpen}>
            <Drawer.Trigger asChild onClick={() => setIsDrawerOpen(true)}>
                <button className="flex items-center justify-center rounded-md shadow-md bg-green-600 w-10 h-10 transition duration-300 hover:scale-105 cursor-pointer">
                    <Plus className="w-6 h-6 text-primary-foreground" />
                </button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-sveYellowDarker flex flex-col max-h-[85vh] rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 bg-sveYellowDarker rounded-t-[10px] flex-1">
                        <Drawer.Title className="flex items-center justify-between font-sans font-bold text-2xl mb-4">
                            <div className="flex items-center">
                                <User className="w-8 h-8 mr-2" />
                                New Player
                            </div>
                            <X onClick={() => setIsDrawerOpen(false)} className="h-8 w-8 mr-2 text-red-600 transition duration-300 cursor-pointer hover:scale-105" />
                        </Drawer.Title>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 text-primary">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-sans font-bold text-lg">
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="player" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                The name will be used to log in.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-between space-x-4">
                                    <FormField
                                        control={form.control}
                                        name="displayName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-sans font-bold text-lg">
                                                    Display Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="slapshotter47" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is the name that will be displayed on the roster.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-sans font-bold text-lg">
                                                    Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="47" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Every player needs a number.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-sans font-bold text-lg">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                The user will use this password to log in.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-between">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-sans font-bold text-lg">
                                                    Role
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup className="flex" onValueChange={field.onChange} defaultValue={field.value}>
                                                        <Label htmlFor="player" className="flex flex-col items-center justify-between rounded-md border-2 border-primary text-primary-foreground bg-primary p-3 cursor-pointer hover:bg-gray-800 [&:has([data-state=checked])]:border-white">
                                                            <RadioGroupItem value="PLAYER" id="player" className="sr-only" checked={field.value === "PLAYER"} />
                                                            <span>Player</span>
                                                        </Label>
                                                        <Label htmlFor="coach" className="flex flex-col items-center justify-between rounded-md border-2 border-primary text-primary-foreground bg-primary p-3 cursor-pointer hover:bg-gray-800 [&:has([data-state=checked])]:border-white">
                                                            <RadioGroupItem value="COACH" id="coach" className="sr-only" checked={field.value === "COACH"} />
                                                            <span>Coach</span>
                                                        </Label>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormDescription>
                                                    The role of the player.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-sans font-bold text-lg">
                                                    Position
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="GOLIE">
                                                            Goalkeeper
                                                        </SelectItem>
                                                        <SelectItem value="DEFENDER">
                                                            Defender
                                                        </SelectItem>
                                                        <SelectItem value="CENTER">
                                                            Center
                                                        </SelectItem>
                                                        <SelectItem value="FORWARD">
                                                            Forward
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Primary position of the player.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="isReferee"
                                    render={({ field }) => (
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md shadow-md border-2 border-sveYellow p-4">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="font-sans font-bold">
                                                    Referee?
                                                </FormLabel>
                                                <FormDescription>
                                                    Check this box if the player is a referee.
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="license"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-sans font-bold text-lg">
                                                License
                                            </FormLabel>
                                            <FormControl>
                                                <Input disabled={!form.watch("isReferee")} placeholder="L1, L2, ..." {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is the license that the referee has.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={isLoading} type="submit" className="w-full mt-4">
                                    Create Player
                                </Button>
                            </form>
                        </Form>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default CreatePlayer;