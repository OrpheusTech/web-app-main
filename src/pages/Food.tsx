import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import img from "../assets/food.jpg";


const Food = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Top Content */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={img}
          alt="Picture of food"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
        <div className="relative z-10 px-8 sm:px-16 lg:px-24">
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold text-white mb-6 z-20 text-center">
            Food & Agriculture
          </h1>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none mb-12">
            <h2 className="text-lg md:text-3xl font-bold mb-6">
              Streamlining Farm-to-Table Operations
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Orpheus is preserving the transparency and integrity of the food
              and agricultural value chain. From farm-to-table supply chain
              modeling and dynamic inventory sourcing to increasing crop yield
              and remediating waste and soil toxins, Orpheus streamlines and
              traces essential systems across the Nation. Our terminal enables
              enterprise provability for food safety and quality assurance,
              embedded with precise financial forecasting, while drafting
              encrypted contracts to automate shipping and delivery.
            </p>
          </div>
          <div className="prose prose-invert max-w-none mb-12 break-all">
            <h2 className="text-lg md:text-3xl font-bold mb-6">
              Data-Powered Food Insights
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Orpheus enables food manufacturers, food service organizations,
              and farmers to control their operations and capture significantly
              more value than before. By sourcing and encrypting disparate data
              and building intelligent oversight models that elevate
              understanding and mapping of alternative business decisions,
              Orpheus’ AI platform is transforming food and agricultural
              businesses for the new era of technology.
            </p>
          </div>
          <div className="prose prose-invert max-w-none mb-12">
            <h2 className="text-lg md:text-3xl font-bold mb-6">
              Traceability and Predictive Foresight
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Orpheus’ traceability of supply chains is to help farmers and
              enterprising agriculture companies to leverage their data to run
              multiple scenario analyses to track business opportunities and
              develop the foresight to prevent weak yield cycles, agricultural
              attacks or unforeseen price fluctuations in food prices at the
              pace necessary to profit in the twenty first century.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Food;
