"use client";

import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
    user: User
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    user
}) => {
    return (
        <Avatar>
            <AvatarImage src="/avatar.jpg" alt="Avatar" />
            <AvatarFallback>
                SVE
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;