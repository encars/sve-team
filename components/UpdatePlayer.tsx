"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Drawer } from "vaul";
import { Edit, Trash2, User, X } from "lucide-react";
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
import { User as UserType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import axios from "axios";

const formSchema = z.object({
    name: z.string().min(1).max(255),
    displayName: z.string().min(1).max(255),
    number: z.string().min(0).max(2),
    password: z.string().min(0).max(255),
    role: z.enum(["PLAYER", "COACH"]),
    position: z.enum(["GOLIE", "DEFENDER", "CENTER", "FORWARD"]),
    stick: z.enum(["L", "R"]),
    isReferee: z.boolean(),
    license: z.string().min(0).max(255),
}).refine(data => (data.isReferee ? data.license !== "" : true), {
    message: "License is required for referees.",
    path: ["license"],
});

interface UpdatePlayerProps {
    player: UserType;
};

const UpdatePlayer: React.FC<UpdatePlayerProps> = ({
    player
}) => {
    const router = useRouter();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: player.name,
            displayName: player.displayName,
            number: player.number ?? "",
            password: "",
            role: player.role,
            position: player.position ?? "GOLIE",
            stick: player.stick ?? "L",
            isReferee: player.isReferee,
            license: player.license ?? "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        axios.post("/api/admin/players/update", {
            data: {
                id: player.id,
                name: values.name,
                displayName: values.displayName,
                number: values.number,
                password: values.password,
                role: values.role,
                position: values.position,
                stick: values.stick,
                isReferee: values.isReferee,
                license: values.license,
            },
        })
            .then(() => {
                setIsDrawerOpen(false);
                router.refresh();

                toast({
                    title: `Player ${player.name} updated!`,
                    description: `Player ${player.name} has been updated successfully.`,
                    variant: "success",
                });
            })
            .catch(err => {
                throw new Error(err);
            })
            .finally(() => {
                setIsLoading(false);
            }
        );   
    };

    const onDelete = async () => {
        setIsLoading(true);

        axios.post("/api/admin/players/delete", {
            data: {
                id: player.id,
            },
        })
            .then(() => {
                setIsDrawerOpen(false);
                router.refresh();

                toast({
                    title: `Player ${player.name} deleted!`,
                    description: `Player ${player.name} has been deleted successfully.`,
                    variant: "success",
                });
            })
            .catch(err => {
                throw new Error(err);
            })
            .finally(() => {
                setIsLoading(false);
            }
        );
    };

    return (
        <Drawer.Root open={isDrawerOpen}>
            <Drawer.Trigger asChild onClick={() => setIsDrawerOpen(true)}>
                <Button variant="ghost" size="sm">
                    <Edit className="w-5 h-5" />
                </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-sveYellowDarker flex flex-col max-h-[85vh] rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 bg-sveYellowDarker rounded-t-[10px] flex-1">
                        <Drawer.Title className="flex items-center justify-between font-sans font-bold text-2xl mb-4">
                            <X onClick={() => setIsDrawerOpen(false)} className="w-8 h-8 mr-2" />
                            Update Player
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="w-[80%]">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Delete Player
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this player? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction onClick={onDelete}>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
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
                                <div className="flex items-center justify-between">
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
                                    <FormField
                                        control={form.control}
                                        name="stick"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-sans font-bold text-lg">
                                                    Stick
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup className="flex" onValueChange={field.onChange} defaultValue={field.value}>
                                                        <Label htmlFor="l" className="flex flex-col items-center justify-between rounded-md border-2 border-primary text-primary-foreground bg-primary p-3 cursor-pointer hover:bg-gray-800 [&:has([data-state=checked])]:border-white">
                                                            <RadioGroupItem value="L" id="l" className="sr-only" checked={field.value === "L"} />
                                                            <span>L</span>
                                                        </Label>
                                                        <Label htmlFor="r" className="flex flex-col items-center justify-between rounded-md border-2 border-primary text-primary-foreground bg-primary p-3 cursor-pointer hover:bg-gray-800 [&:has([data-state=checked])]:border-white">
                                                            <RadioGroupItem value="R" id="r" className="sr-only" checked={field.value === "R"} />
                                                            <span>R</span>
                                                        </Label>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormDescription>
                                                    Stick hand
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                                    Update Player
                                </Button>
                            </form>
                        </Form>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default UpdatePlayer;