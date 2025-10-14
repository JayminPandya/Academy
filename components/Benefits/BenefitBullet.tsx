import { motion } from "framer-motion";

import { IBenefitBullet } from "@/types";
import { childVariants } from "./BenefitSection";

const BenefitBullet: React.FC<IBenefitBullet> = ({
  title,
  description,
  icon,
}: IBenefitBullet) => {
  return (
    <motion.div
      className="flex items-start text-left mt-8"
      variants={childVariants}
    >
      <div className="flex-shrink-0 text-[#b89658] bg-yellow-100 rounded-full p-3">
        {icon}
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default BenefitBullet;
