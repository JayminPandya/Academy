import PricingColumn from "./PricingColumn";

import { tiers } from "@/data/pricing";

const Pricing: React.FC = () => {
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28"
      id="pricing"
    >
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-5xl md:text-6xl font-extrabold text-text-dark leading-tight">
          Hear From Our <span className="text-[#b89658]">Chess Families</span>
        </h2>
        <p className="mt-4 text-xl text-text-medium font-medium">
          Discover the impact of our coaching from the parents who trust us.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <PricingColumn key={tier.name} tier={tier} highlight={index === 1} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
