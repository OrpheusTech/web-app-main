import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Terminal = () => {
    const columns = [
        {
            name: "Commodity",
            id: "commodity"
        },
        {
            name: "Unit",
            id: "unit"
        },
        {
            name: "Price",
            id: "price"
        },
        {
            name: "Day % Change",
            id: "dayChange"
        },
        {
            name: "Last Update",
            id: "date"
        },
    ]

    const rows = [
        {
            commodity: "Soybeans",
            unit: "USD/Bu",
            price: "989.04",
            date: ""
        },
        {
            commodity: "Wheat",
            unit: "USD/Bu",
            price: "538.25",
            date: ""
        },
        {
            commodity: "Lumber",
            unit: "USD/Bu",
            price: "678.16",
            date: ""
        },
        {  
            commodity: "Corn"
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
            Live trading price data of agricultural commodities.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <table className="relative table-fixed w-full text-lg border border-separate border-spacing-y-1">
            <thead>
                <tr className="border">
                    {columns.map((col, idx) => (
                        <th key={idx} className={`text-primary bg-card py-2 pl-4 ${col.id == "commodity" ? "text-left" : "text-center"}`}>{col.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={`${rowIndex % 2 == 1 ? "bg-card" : ""} hover:shadow-lg transition-all duration-300 hover:ring-2 hover:ring-z-10 hover:ring-primary text-muted-foreground hover:text-inherit`}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex} className={`py-2 pl-4 ${col.id == "commodity" ? "text-left" : "text-center"}`}>
                                {row[col.id]}
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
