import React from "react";
import Image from "next/image";

const Navigation: React.FC = () => {
  return (
    <div className="sm:col-span-6 flex flex-col">
      <Image
        src="/crossmint-logo.svg"
        width={192}
        height={43}
        className="rounded-lg shrink"
        alt="Crossmint logo"
        priority={true}
      />
    </div>
  );
};

export default Navigation;
