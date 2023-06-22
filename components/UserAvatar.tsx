"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {}

const UserAvatar: React.FC<UserAvatarProps> = ({}) => {
    return (
        <Avatar>
            <AvatarImage src="/floorball.svg" alt="Avatar" />
            <AvatarFallback>
                SVE
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;