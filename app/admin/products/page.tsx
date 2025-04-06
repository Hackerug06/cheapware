"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Edit, Trash2, Plus, Save, X, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AdminLayout from "@/components/admin-layout"
import { getProducts, createProduct, updateProduct, deleteProduct, type Product } from "@/lib/api"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({})
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    image: "/placeholder.svg?height=100&width=100&text=New+Product",
    category: "",
    brand: "",
    stock: 0,
    featured: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError("Failed to load products. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleEdit = (product: Product) => {
    setIsEditing(product.id)
    setEditedProduct({ ...product })
  }

  const handleSaveEdit = async () => {
    setError(null)
    try {
      if (isEditing === null) return

      const updatedProduct = await updateProduct(isEditing, editedProduct)

      // Update local state
      setProducts(products.map((p) => (p.id === isEditing ? updatedProduct : p)))

      setSuccess("Product updated successfully")
      setTimeout(() => setSuccess(null), 3000)

      setIsEditing(null)
      setEditedProduct({})
    } catch (error) {
      console.error("Error updating product:", error)
      setError("Failed to update product. Please try again.")
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(null)
    setEditedProduct({})
  }

  const handleDelete = async (id: number) => {
    setError(null)
    try {
      await deleteProduct(id)

      // Update local state
      setProducts(products.filter((p) => p.id !== id))

      setSuccess("Product deleted successfully")
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error("Error deleting product:", error)
      setError("Failed to delete product. Please try again.")
    }
  }

  const handleAddNew = async () => {
    setError(null)
    try {
      // Validate required fields
      if (!newProduct.name || !newProduct.price) {
        setError("Name and price are required fields")
        return
      }

      const addedProduct = await createProduct(newProduct as Omit<Product, "id">)

      // Update local state
      setProducts([...products, addedProduct])

      setSuccess("Product added successfully")
      setTimeout(() => setSuccess(null), 3000)

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
    } catch (error) {
      console.error("Error adding product:", error)
      setError("Failed to add product. Please try again.")
    }
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <Button onClick={() => setIsAddingNew(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-500 text-green-700">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {isAddingNew && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <Label htmlFor="new-name">Product Name*</Label>
                    <Input
                      id="new-name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="new-description">Description</Label>
                    <Textarea
                      id="new-description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="new-price">Price ($)*</Label>
                    <Input
                      id="new-price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="new-image">Image URL</Label>
                    <Input
                      id="new-image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <Label htmlFor="new-category">Category</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger id="new-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kitchen">Kitchen</SelectItem>
                        <SelectItem value="Laundry">Laundry</SelectItem>
                        <SelectItem value="Refrigeration">Refrigeration</SelectItem>
                        <SelectItem value="Small Appliances">Small Appliances</SelectItem>
                        <SelectItem value="Climate Control">Climate Control</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="new-brand">Brand</Label>
                    <Input
                      id="new-brand"
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="new-stock">Stock</Label>
                    <Input
                      id="new-stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="mb-4 flex items-center space-x-2">
                    <Switch
                      id="new-featured"
                      checked={newProduct.featured}
                      onCheckedChange={(checked) => setNewProduct({ ...newProduct, featured: checked })}
                    />
                    <Label htmlFor="new-featured">Featured Product</Label>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddNew}>Add Product</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Brand</TableHead>
                  <TableHead className="hidden md:table-cell">Stock</TableHead>
                  <TableHead className="hidden md:table-cell">Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative h-10 w-10 rounded-md overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {isEditing === product.id ? (
                        <Input
                          value={editedProduct.name}
                          onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                        />
                      ) : (
                        product.name
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing === product.id ? (
                        <Input
                          type="number"
                          value={editedProduct.price}
                          onChange={(e) =>
                            setEditedProduct({ ...editedProduct, price: Number.parseFloat(e.target.value) })
                          }
                        />
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {isEditing === product.id ? (
                        <Select
                          value={editedProduct.category}
                          onValueChange={(value) => setEditedProduct({ ...editedProduct, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Kitchen">Kitchen</SelectItem>
                            <SelectItem value="Laundry">Laundry</SelectItem>
                            <SelectItem value="Refrigeration">Refrigeration</SelectItem>
                            <SelectItem value="Small Appliances">Small Appliances</SelectItem>
                            <SelectItem value="Climate Control">Climate Control</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        product.category
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {isEditing === product.id ? (
                        <Input
                          value={editedProduct.brand}
                          onChange={(e) => setEditedProduct({ ...editedProduct, brand: e.target.value })}
                        />
                      ) : (
                        product.brand
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {isEditing === product.id ? (
                        <Input
                          type="number"
                          value={editedProduct.stock}
                          onChange={(e) =>
                            setEditedProduct({ ...editedProduct, stock: Number.parseInt(e.target.value) })
                          }
                        />
                      ) : (
                        product.stock
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {isEditing === product.id ? (
                        <Switch
                          checked={editedProduct.featured}
                          onCheckedChange={(checked) => setEditedProduct({ ...editedProduct, featured: checked })}
                        />
                      ) : product.featured ? (
                        "Yes"
                      ) : (
                        "No"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {isEditing === product.id ? (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                            <Save className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

  
