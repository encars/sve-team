import { ArrowUp, Shield, Target, Heart } from "lucide-react"

export const categories = {
    OFFENSIVE: {
        name: "Offensive",
        link: "/playbook/offensive",
        icon: ArrowUp
    },
    DEFENSIVE: {
        name: "Defensive",
        link: "/playbook/defensive",
        icon: Shield
    },
    GOALIE: {
        name: "Goalie",
        link: "/playbook/goalie",
        icon: Target
    },
    FITNESS: {
        name: "Fitness",
        link: "/playbook/fitness",
        icon: Heart
    }
}

export enum Tag {
    SHOOTING = "Shooting",
    PASSING = "Passing",
    POSITIONING = "Positioning",
    REFLEXES = "Reflexes",
    AGILITY = "Agility",
    COUNTER_ATTACK = "Counter Attack",
}