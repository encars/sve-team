import CreateEvent from "./CreateEvent";

const AddEvent = () => {
    return (
        <div className="flex flex-col bg-sveYellowDarker font-bold">
            <div className="flex items-center justify-between bg-sveYellow rounded-t-md p-2 px-4">
                <h2 className="text-2xl">
                    Add an event
                </h2>
                <CreateEvent />                
            </div>
        </div>
    );
};

export default AddEvent;