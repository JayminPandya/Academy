import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";

import { IStats } from "@/types";

export const stats: IStats[] = [
    {
        title: "5000+",
        icon: <BsBarChartFill size={34} className="text-blue-500" />,
        description: "Students have already enrolled to learn chess at Ashutosh Chess Academy."
    },
    {
        title: "5.0",
        icon: <BsFillStarFill size={34} className="text-yellow-500" />,
        description: "Once join us, you will never leave us. We have a 5 - star rating from our students and parents."
    },
    {
        title: "20+ ",
        icon: <PiGlobeFill size={34} className="text-green-600" />,
        description: "We teach students from over 20 countries, making chess accessible globally."
    }
];