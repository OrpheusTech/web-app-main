import React from "react";
import { Button } from "./ui/button";

const SupplyChain = () => {
  return (
    <section id="scroll-target-section" className="py-24 bg-card to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent quicksand-font">
            Protect Your Identity. Secure Your Supply Chain
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Sign up securely with your private key and gain real-time access to
            land valuation. supply-chain analysis and economic modeling.
          </p>
        </div>
        <div className="text-center">
            <Button className="text-blue-500 text-2xl my-10 md:text-3xl lg:text-4xl hover:bg-card" variant="ghost">Generate Private Keys</Button>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your Identity is secured. No email or name required Blockchain-based login
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupplyChain;
