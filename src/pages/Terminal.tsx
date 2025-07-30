import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Terminal = () => {
    const columns = [
        {
            name: "Commodity"
        },
        {
            name: "Unit"
        },
        {
            name: "Price"
        },
    ]

    const rows = [
        {
            Commodity: "Soybeans",
            Unit: "USD/Bu",
            Price: "989.04"
        },
        {
            Commodity: "Wheat",
            Unit: "USD/Bu",
            Price: "538.25"
        },
        {
            Commodity: "Lumber",
            Unit: "USD/Bu",
            Price: "678.16"
        },
    ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-background to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">Prices</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Agricultural Commodity<span className="text-primary">&nbsp;Prices</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Live trading price data of agricultural commodities from Trading Economics
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <table className="w-full text-lg">
            <thead>
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} className="border p-2 text-primary bg-card">{col.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="relative z-10 hover:shadow-lg transition-all duration-300 hover:ring-2 hover:ring-z-10 hover:ring-primary text-muted-foreground hover:text-inherit">
                        {columns.map((col, colIndex) => (
                            <td key={colIndex} className="relative border p-2 text-center">
                                {row[col.name]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terminal;
