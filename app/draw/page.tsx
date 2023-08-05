"use client";

import dynamic from "next/dynamic";
import Toolbar from "./components/Toolbar";

const FullField = dynamic(() => import ("./components/FullField"), {
    ssr: false,
});

const DrawPage = () => {
    return (
        <div className="relative py-14 flex items-center overflow-hidden">
            <Toolbar />
            <FullField />
        </div>
    );
};

export default DrawPage;