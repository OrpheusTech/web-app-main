
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContaminationData = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            New data show 8,865 sites with PFAS in 50 states
          </h2>
          <p className="text-muted-foreground text-right text-sm">Source: ewg</p>
        </div>

        {/* Map Placeholder */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div 
              className="w-full h-96 bg-cover bg-center rounded-lg relative overflow-hidden"
              style={{
                backgroundImage: `url('/lovable-uploads/8d01246a-2a05-4a20-ace4-90f53305da41.png')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent">
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  (Interactive)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
