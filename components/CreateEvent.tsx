"use client";

import * as z from "zod";
import { CalendarIcon, Plus, X } from "lucide-react";
import { useState } from "react";
import { Drawer } from "vaul";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { toast } from "./ui/use-toast";

const baseEventSchema = z.object({
    date: z.date(),
    time: z.string().min(1, { message: "Time is required"}),
    location: z.string().min(1).max(255),
    notes: z.string().optional(),
});

const matchEventSchema = baseEventSchema.extend({
    type: z.literal("MATCH"),
    homeTeam: z.string().min(1).max(255),
    awayTeam: z.string().min(1).max(255),
    needRef: z.boolean(),
});

const practiceEventSchema = baseEventSchema.extend({
    type: z.literal("PRACTICE"),
});

const formSchema = z.union([matchEventSchema, practiceEventSchema]);

const CreateEvent = () => {
    const router = useRouter();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "MATCH",
            date: new Date(),
            time: "",
            location: "",
            homeTeam: "",
            awayTeam: "",
            needRef: false,
            notes: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        axios.post("/api/admin/matches/create", values)
            .then(() => {
                setIsDrawerOpen(false);
                router.refresh();
                form.reset();

                toast({
                    title: "Event created",
                    description: "The event has been created successfully.",
                    variant: "success",
                });
            })
            .catch(() => {
                toast({
                    title: "Error",
                    description: "There was an error creating the event.",
                    variant: "destructive",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                                <CalendarIcon className="w-8 h-8 mr-2" />
                                New Event
                            </div>
                            <X onClick={() => setIsDrawerOpen(false)} className="h-8 w-8 mr-2 text-red-600 transition duration-300 cursor-pointer hover:scale-105" />
                        </Drawer.Title>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 text-primary">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-sans font-bold text-lg">
                                                Type
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="MATCH">
                                                        Match
                                                    </SelectItem>
                                                    <SelectItem value="PRACTICE">
                                                        Practice
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                Match or practice?
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-between">
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-sans font-bold">
                                                    Date
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant="sve" className="w-full">
                                                                {format(field.value, "PPP")}
                                                                <CalendarIcon className="ml-auto h-4 w-4" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) => date < new Date()}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="time"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-sans font-bold">
                                                    Time
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="time"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-sans font-bold">
                                                Location
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="21 Jump Street, Los Angeles, CA"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Where?
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.watch("type") === "MATCH" && (
                                    <>
                                        <div className="flex items-center space-x-2">
                                            <FormField
                                                control={form.control}
                                                name="homeTeam"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-sans font-bold">
                                                            Home Team
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Barca"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Home team
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="awayTeam"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-sans font-bold">
                                                            Away Team
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Real"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Away team
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="needRef"
                                            render={({ field }) => (
                                                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md shadow-md border-2 border-sveYellow p-4">
                                                    <FormControl>
                                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="font-sans font-bold">
                                                            Referees Needed?
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Do we need referees?
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-sans font-bold">
                                                Notes
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Don&apos;t forget your stick!"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Anything else?
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={isLoading} type="submit" className="w-full mt-4 bg-green-600">
                                    Create Event
                                </Button>
                            </form>
                        </Form>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default CreateEvent;