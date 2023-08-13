"use client";

import { Edit, X } from "lucide-react";
import { useState } from "react";
import { Drawer } from "vaul";

const EventFilters = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    return (
        <Drawer.Root open={isDrawerOpen}>
            <Drawer.Trigger asChild onClick={() => setIsDrawerOpen(true)}>
                <button className="flex items-center justify-center rounded-md shadow-md bg-yellow-300 w-10 h-10 transition duration-300 hover:scale-105 cursor-pointer">
                    <Edit className="w-6 h-6" />
                </button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-sveYellowDarker flex flex-col max-h-[85vh] rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 bg-sveYellowDarker rounded-t-[10px] flex-1">
                        <Drawer.Title className="flex items-center justify-between font-sans font-bold text-2xl mb-4">
                            <div className="flex items-center">
                                <Edit className="w-6 h-6 mr-2" />
                                Update an Event
                            </div>
                            <X onClick={() => setIsDrawerOpen(false)} className="w-8 h-8 mr-2 text-red-600 transition duration-300 cursor-pointer hover:scale-105" />
                        </Drawer.Title>

                        
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default EventFilters;