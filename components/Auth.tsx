"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Auth = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            toast({
                title: "Bruh",
                description: "It's not that hard to enter a username and password.",
                variant: "default",
            })
            return;
        }

        setIsLoading(true);

        signIn("credentials", {
            username,
            password,
            redirect: false,
        })
        .then((callback) => {
            if (callback?.error) {
                toast({
                    title: "Error",
                    description: "Invalid username or password.",
                    variant: "destructive",
                })
            }

            if (callback?.ok && !callback.error) {
                toast({
                    title: "Success",
                    description: "You have successfully logged in.",
                    variant: "default",
                });
                router.push("/dashboard");
                router.refresh();
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <form onSubmit={handleSubmit} className="border p-12 border-muted-foreground rounded-md shadow-md shadow-blue-500 focus:shadow-lg hover:shadow-lg hover:shadow-blue-600 transition duration-300">
            <div className="flex flex-col space-y-2 mb-4">
                <div className="flex flex-col items-center justify-between mb-4">
                    <h1 className="font-serif text-primary-foreground text-3xl text-center">
                        Members only
                    </h1>
                    <small className="font-sans text-muted-foreground">
                        Please login to continue
                    </small>
                </div>
                <Label className="sr-only" htmlFor="username">
                    Username
                </Label>
                <Input
                    id="username"
                    placeholder="Username"
                    type="text"
                    disabled={isLoading}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-white placeholder:text-muted-foreground transition duration-300 hover:shadow-md hover:shadow-sveYellow"
                />
                <Label className="sr-only" htmlFor="password">
                    Password
                </Label>
                <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-white placeholder:text-muted-foreground transition duration-300 hover:shadow-md hover:shadow-sveYellow"
                />
            </div>
            <Button variant="secondary" disabled={isLoading} className="w-full">
                {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
            </Button>
        </form>
    );
};

export default Auth;