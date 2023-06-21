"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface AuthProps { }

const Auth: React.FC<AuthProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2 mb-4">
                <Label className="sr-only" htmlFor="username">
                    Username
                </Label>
                <Input
                    id="username"
                    placeholder="Username"
                    type="text"
                    required
                    disabled={isLoading}
                    className="text-white"
                />
                <Label className="sr-only" htmlFor="password">
                    Password
                </Label>
                <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    required
                    disabled={isLoading}
                    className="text-white"
                />
            </div>
            <Button variant="secondary" disabled={isLoading}>
                {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
            </Button>
        </form>
    );
};

export default Auth;