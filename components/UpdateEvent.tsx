import { Edit } from "lucide-react";
import EventFilters from "./EventFilters";

const UpdateEvent = () => {
    return (
        <div className="flex flex-col bg-sveYellowDarker font-sans font-bold">
            <div className="flex items-center justify-between bg-sveYellow rounded-t-md p-2 px-4">
                <h2 className="text-2xl">
                    Update event
                </h2>
                <EventFilters />
            </div>

        </div>
    );
};

export default UpdateEvent;