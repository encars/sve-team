"use client";

import * as z from "zod";
import { Calendar, Plus, X } from "lucide-react";
import { useState } from "react";
import { Drawer } from "vaul";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    type: z.enum(["MATCH", "PRACTICE"]),
    date: z.date(),
    location: z.string().min(1).max(255),
    homeTeam: z.string().min(1).max(255),
    awayTeam: z.string().min(1).max(255),
    score: z.string(),
    needRef: z.boolean(),
    notes: z.string(),
});

const CreateEvent = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "MATCH",
            date: new Date(),
            location: "",
            homeTeam: "",
            awayTeam: "",
            score: "",
            needRef: false,
            notes: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

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
                                <Calendar className="w-8 h-8 mr-2" />
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
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default CreateEvent;