
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContaminationData = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            New data show 8,865 sites with PFAS in 50 states
          </h2>
          <p className="text-muted-foreground mb-4">
            The interactive map below showcases Perfluoroalkyl and Polyfluoroalkyl Substances (PFAS, also known as forever chemicals) contamination data from thousands of sites in the United States.
          </p>
        </div>

        <div className="relative w-full h-[600px]">
          <iframe
            src="https://www.ewg.org/interactive-maps/pfas_contamination/map/"
            width="100%"
            height="550"
            loading="lazy"
            className="mb-4"
            title="Interactive Water Contamination Map"
          ></iframe>
          <div className="absolute inset-0 bg-black bg-opacity-10 pointer-events-none z-10"></div>
        </div>
        

        <p className="text-sm text-gray-500 mt-2 mb-12">
          Map courtesy of the&nbsp;
          <a href="https://www.ewg.org/interactive-maps/pfas_contamination/map/" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-700">
            Environmental Working Group (EWG)
          </a>. Accessed July 12, 2025.
        </p>

        {/* Problem Statement */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">The Challenge We're Solving</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Conventional agriculture has degraded soil, polluted ecosystems, and reduced arable land. Contaminants such as heavy metals, plasticizers, and PFAS have become ubiquitous in our farmland. But it doesn't have to be this way. Orpheus is leading the charge in cleaning up our farms so that all Americans can enjoy clean, healthy food. Not to mention, our bio-based remediation strategies sequester carbon and generate profitable industrial materials for farmers to sell, so it's a win all around.
              </p>
              
              <div className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Let's make food clean again.</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContaminationData;
