import CreateEvent from "./CreateEvent";

const AddEvent = () => {
    return (
        <div className="flex flex-col bg-sveYellowDarker font-sans font-bold">
            <div className="flex items-center justify-between bg-sveYellow rounded-t-md p-2 px-4">
                <p className="text-2xl">
                    Add an event
                </p>
                <CreateEvent />                
            </div>
        </div>
    );
};

export default AddEvent;