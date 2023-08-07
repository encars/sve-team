import { Plus } from "lucide-react";

const AddEvent = () => {
    return (
        <div className="flex flex-col bg-sveYellowDarker font-sans font-bold">
            <div className="flex items-center justify-between bg-sveYellow rounded-t-md p-2 px-4">
                <p className="text-2xl">
                    Add an event
                </p>
                <button className="flex items-center justify-center rounded-md shadow-md bg-green-600 w-10 h-10 transition duration-300 hover:scale-105 cursor-pointer">
                    <Plus className="w-6 h-6 text-primary-foreground" />
                </button>
            </div>
        </div>
    );
};

export default AddEvent;