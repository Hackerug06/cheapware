"use client"

import { useState } from "react"
import { Edit, Trash2, Plus, Save, X } from "lucide-react"

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Refrigerator",
      description: "Energy-efficient refrigerator with smart features",
      price: 899.99,
      image: "/placeholder.svg?height=300&width=300&text=Refrigerator",
      category: "Refrigeration",
      brand: "CoolTech",
      stock: 15,
      featured: true,
    },
    {
      id: 2,
      name: "Front Load Washing Machine",
      description: "High-efficiency washing machine with multiple wash programs",
      price: 649.99,
      image: "/placeholder.svg?height=300&width=300&text=Washing+Machine",
      category: "Laundry",
      brand: "CleanPro",
      stock: 8,
      featured: true,
    },
    {
      id: 3,
      name: "Smart Microwave Oven",
      description: "Microwave with smart sensors and multiple cooking modes",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300&text=Microwave",
      category: "Kitchen",
      brand: "SmartCook",
      stock: 20,
      featured: false,
    },
  ])
  const [isEditing, setIsEditing] = useState(null)
  const [editedProduct, setEditedProduct] = useState({})
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    image: "/placeholder.svg?height=100&width=100&text=New+Product",
    category: "",
    brand: "",
    stock: 0,
    featured: false,
  })

  const handleEdit = (product) => {
    setIsEditing(product.id)
    setEditedProduct({ ...product })
  }

  const handleSaveEdit = () => {
    setProducts(products.map((p) => (p.id === isEditing ? { ...p, ...editedProduct } : p)))
    setIsEditing(null)
    setEditedProduct({})
  }

  const handleCancelEdit = () => {
    setIsEditing(null)
    setEditedProduct({})
  }

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleAddNew = () => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1
    const productToAdd = {
      id: newId,
      ...newProduct,
    }

    setProducts([...products, productToAdd])
    setIsAddingNew(false)
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      image: "/placeholder.svg?height=100&width=100&text=New+Product",
      category: "",
      brand: "",
      stock: 0,
      featured: false,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setIsAddingNew(true)}
        >
          <Plus className="h-4 w-4" />
          Add New Product
        </button>
      </div>

      {isAddingNew && (
        <div className="mb-8 border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Product Name*</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price ($)*</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Laundry">Laundry</option>
                  <option value="Refrigeration">Refrigeration</option>
                  <option value="Small Appliances">Small Appliances</option>
                  <option value="Climate Control">Climate Control</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Brand</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
                />
              </div>

              <div className="mb-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="new-featured"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                />
                <label htmlFor="new-featured">Featured Product</label>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button className="px-4 py-2 border rounded-md" onClick={() => setIsAddingNew(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleAddNew}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    IMG
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === product.id ? (
                    <input
                      type="text"
                      className="w-full p-1 border rounded-md"
                      value={editedProduct.name}
                      onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === product.id ? (
                    <input
                      type="number"
                      className="w-full p-1 border rounded-md"
                      value={editedProduct.price}
                      onChange={(e) => setEditedProduct({ ...editedProduct, price: Number.parseFloat(e.target.value) })}
                    />
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                  {isEditing === product.id ? (
                    <select
                      className="w-full p-1 border rounded-md"
                      value={editedProduct.category}
                      onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                    >
                      <option value="Kitchen">Kitchen</option>
                      <option value="Laundry">Laundry</option>
                      <option value="Refrigeration">Refrigeration</option>
                      <option value="Small Appliances">Small Appliances</option>
                      <option value="Climate Control">Climate Control</option>
                    </select>
                  ) : (
                    product.category
                  )}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                  {isEditing === product.id ? (
                    <input
                      type="text"
                      className="w-full p-1 border rounded-md"
                      value={editedProduct.brand}
                      onChange={(e) => setEditedProduct({ ...editedProduct, brand: e.target.value })}
                    />
                  ) : (
                    product.brand
                  )}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                  {isEditing === product.id ? (
                    <input
                      type="number"
                      className="w-full p-1 border rounded-md"
                      value={editedProduct.stock}
                      onChange={(e) => setEditedProduct({ ...editedProduct, stock: Number.parseInt(e.target.value) })}
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                  {isEditing === product.id ? (
                    <input
                      type="checkbox"
                      checked={editedProduct.featured}
                      onChange={(e) => setEditedProduct({ ...editedProduct, featured: e.target.checked })}
                    />
                  ) : product.featured ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isEditing === product.id ? (
                    <div className="flex justify-end gap-2">
                      <button className="text-gray-600 hover:text-gray-900" onClick={handleCancelEdit}>
                        <X className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900" onClick={handleSaveEdit}>
                        <Save className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button className="text-blue-600 hover:text-blue-900" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
