import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";


const Industrials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Top Content */}
       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://orpheustech.github.io/web-app-main/industrials.jpg"
          alt="Picture of industrials"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
        <div className="relative z-10 px-8 sm:px-16 lg:px-24">
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold text-white mb-6 z-20 text-center">
            Industrials
          </h1>
        </div>
      </section>
			
      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-none mb-12">
						<h2 className="text-lg md:text-3xl font-bold mb-6">
              Securing America's Industrial Base
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Orpheus is redefining the future of America's industrial sector by integrating permissioned
							ledgers, AI-driven monitoring, and advanced control systems to create resilient, transparent,
							and autonomous supply chains. Drawing from our core mission to revitalize rural economies
							and shift away from toxic industrial agriculture, we extend these principles to bio-based
							manufacturing and broader industrials. By leveraging decentralized technologies, we aim to
							protect against vulnerabilities like supply chain disruptions, foreign dependencies, and
							inefficiencies caused by centralized monopolies.
            </p>
          </div>
          <div className="prose prose-invert max-w-none mb-12">
            <h2 className="text-lg md:text-3xl font-bold mb-6">
              Permissioned Ledgers for Secure Transactions
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              At the heart of our approach are permissioned ledgers—blockchain-based systems that ensure
							controlled access while maintaining immutability and transparency. Unlike public blockchains,
							these ledgers allow only verified participants (farmers, manufacturers, and stakeholders) to join,
							using zero-knowledge proofs (ZKPs) to verify claims without revealing sensitive data. This
							secures America's industrial base by:
            </p>
						<ul className="text-lg text-muted-foreground list-disc pl-8 md:pl-12 w-100%">
							<li>Enabling end-to-end traceability for commodities like fuels, concrete, and plastics.</li>
							<li>Facilitating peer-to-pool transactions that bypass traditional intermediaries, reducing
									costs and enhancing sovereignty over supply chains.</li>
							<li>Protecting against agroterrorism and supply disruptions through encrypted, distributed
									records of land practices, crop yields, and industrial inputs.</li>
						</ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Industrials;
