import { Button } from '@/components/ui/button';
import { FadeInFromDown, TypingIn, AnimatedLine } from '@/components/ui/fade-in';
import orpheusImg from "../assets/soil-tech.png";
import enotriumImg from "../assets/supply-chain-bg.png";


const ValueProposition = () => {
  return (
    <section id="scroll-target-section" className="py-24 bg-gradient-to-br from-background to-muted/20">
      <div className="w-[90%] max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-24">
        <div className="flex justify-between">
          <TypingIn>
            <h1 className="quicksand-font text-5xl lg:text-[6rem]">
              Platforms
            </h1>
          </TypingIn>
          <FadeInFromDown delay={750}>
            <h2 className="text-4xl text-muted-foreground"></h2>
          </FadeInFromDown>
        </div>

        <AnimatedLine color="muted-foreground" height="1px" width="100%" delay={0} duration={500}/>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-[9vw]">
          <div className="relative w-full h-[12rem] lg:h-[24rem]">
            <img src={orpheusImg} className="absolute inset-0 w-full h-full object-cover block" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
            <h2 className="absolute inset-0 flex items-center justify-center text-5xl lg:text-6xl z-10 text-white">
              OrpheusAI
            </h2>
          </div>

          <div className="space-y-8">
            <FadeInFromDown delay={750}>
              <h2 className="text-4xl text-foreground">Soil Modeling Solutions</h2>
            </FadeInFromDown>
            
            <div className="flex gap-4 items-end flex-col lg:flex-row lg:items-start">
              <FadeInFromDown delay={1000}>
                <p className="text-muted-foreground">
                  Introducing OrpheusAI, a revolutionary AI soil modeling platform. Resurrect your soil and optimize operations, transforming agricultural productivity with data-driven insights.
                </p>
              </FadeInFromDown>
              
              <FadeInFromDown delay={1250}>
                <a href="/systems" className="text-right block">
                  <button className="border border-solid border-foreground p-3 rounded-sm hover:text-primary hover:border-primary transition-colors duration-250 whitespace-nowrap">
                    Explore OrpheusAI -&gt;
                  </button>
                </a>
              </FadeInFromDown>
            </div>
            

          </div>       
        </div>
        <AnimatedLine color="muted-foreground" height="1px" width="100%" delay={0} duration={500}/>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-[9vw]">
          <div className="relative w-full h-[12rem] lg:h-[24rem]">
            <img src={enotriumImg} className="absolute inset-0 w-full h-full object-cover block" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
            <h2 className="absolute inset-0 flex items-center justify-center text-5xl lg:text-6xl z-10 text-white">
              Enotrium
            </h2>
          </div>

          <div className="space-y-8">
            <FadeInFromDown delay={750}>
              <h2 className="text-4xl text-foreground">Supply Chain Monitoring Systems</h2>
            </FadeInFromDown>
            
            <div className="flex gap-4 items-end flex-col lg:flex-row lg:items-start">
              <FadeInFromDown delay={1000}>
                <p className="text-muted-foreground">
                  Introducing Enotrium, the advanced supply chain monitoring platform. It provides encrypted tracking of digital assets and real time tracking of supply chain operations and markets.
                </p>
              </FadeInFromDown>
              
              <FadeInFromDown delay={1250}>
                <a href="/systems" className="text-right block">
                  <button className="border border-solid border-foreground p-3 rounded-sm hover:text-primary hover:border-primary transition-colors duration-250 whitespace-nowrap">
                    Explore Enotrium -&gt;
                  </button>
                </a>
              </FadeInFromDown>
            </div>

          </div>
        
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
