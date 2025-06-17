import {
    Code,
    Server,
    Smartphone,
    type LucideIcon,
} from "lucide-react";


interface frameworksType {
    name: string;
    count: number;
    icon: LucideIcon
}

export const frameworks: frameworksType[] = [
    { name: "React", count: 1234, icon: Code },
    { name: "Vue.js", count: 987, icon: Code },
    { name: "Angular", count: 756, icon: Code },
    { name: "Next.js", count: 1432, icon: Code },
    { name: "Express", count: 890, icon: Server },
    { name: "Django", count: 543, icon: Server },
    { name: "Laravel", count: 432, icon: Server },
    { name: "React Native", count: 678, icon: Smartphone },
    { name: "Flutter", count: 567, icon: Smartphone },
];
