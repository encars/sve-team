import { Instagram, Twitch, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="flex flex-col items-center py-4 bg-sveYellow space-y-2">
            <div className="flex space-x-2">
                <Instagram />
                <Twitter />
                <Twitch />
            </div>
            <p className="font-mono">
                &copy; 2021 SVE Hamburg
            </p>
        </footer>
    );
};

export default Footer;