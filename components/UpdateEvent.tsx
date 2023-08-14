import getMatches from "@/actions/getAllMatches";
import EventDrawer from "./EventDrawer";
import getAllPractices from "@/actions/getAllPractices";

const UpdateEvent = async () => {
    const matches = await getMatches();
    const practices = await getAllPractices();

    return (
        <div className="flex flex-col bg-sveYellowDarker font-sans font-bold">
            <div className="flex items-center justify-between bg-sveYellow rounded-t-md p-2 px-4">
                <h2 className="text-2xl">
                    Update an event
                </h2>
                <EventDrawer initialMatches={matches} initialPractices={practices} />
            </div>

        </div>
    );
};

export default UpdateEvent;