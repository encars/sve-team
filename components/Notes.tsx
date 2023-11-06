import { StickyNote } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface NotesProps {
    notes: string | null;
};

const Notes: React.FC<NotesProps> = ({
    notes
}) => {
    return (
        <Accordion type="single" collapsible className="w-full px-4 shadow-md rounded-md bg-sveYellow">
            <AccordionItem value="playerlist">
                <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-4">
                        <StickyNote className="h-6 w-6" />
                        Notes
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className="max-h-[290px] overflow-y-auto overflow-x-hidden rounded-md text-left text-base">
                        {notes}
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default Notes;