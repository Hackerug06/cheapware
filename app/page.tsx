export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">Cheapware</h1>
      <p className="text-xl mb-8">Quality home appliances at affordable prices</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {[
          { name: "Refrigerator", price: 899.99 },
          { name: "Washing Machine", price: 649.99 },
          { name: "Microwave", price: 129.99 },
          { name: "Dishwasher", price: 549.99 },
          { name: "Air Conditioner", price: 499.99 },
          { name: "Electric Kettle", price: 39.99 },
        ].map((product, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm">
            <div className="h-40 bg-gray-200 mb-4 flex items-center justify-center text-gray-500">{product.name}</div>
            <h3 className="font-medium text-lg">{product.name}</h3>
            <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

           
