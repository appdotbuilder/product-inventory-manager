import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Package, 
    Plus, 
    Search, 
    BarChart3, 
    AlertTriangle,
    CheckCircle,
    DollarSign,
    Building
} from 'lucide-react';



export default function Welcome() {
    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-16">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="mb-8">
                            <div className="text-8xl mb-4">📦</div>
                            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                Inventory Manager Pro
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Take control of your inventory with our comprehensive management system. 
                                Track products, monitor stock levels, and manage suppliers all in one place.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                size="lg" 
                                className="text-lg px-8 py-4"
                                onClick={() => router.get('/')}
                            >
                                <Package className="h-5 w-5 mr-2" />
                                View Inventory
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="text-lg px-8 py-4"
                                onClick={() => router.get(route('products.create'))}
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Product
                            </Button>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                            Everything You Need to Manage Your Inventory
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="text-center">
                                <CardHeader>
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <CardTitle>Product Management</CardTitle>
                                    <CardDescription>
                                        Add, edit, and organize your products with detailed information including descriptions, categories, and supplier details.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="text-center">
                                <CardHeader>
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <CardTitle>Stock Tracking</CardTitle>
                                    <CardDescription>
                                        Monitor stock levels in real-time with automatic alerts for low stock and out-of-stock items.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="text-center">
                                <CardHeader>
                                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <CardTitle>Advanced Search</CardTitle>
                                    <CardDescription>
                                        Quickly find products using powerful search and filtering by name, category, supplier, or stock status.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="text-center">
                                <CardHeader>
                                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <CardTitle>Smart Alerts</CardTitle>
                                    <CardDescription>
                                        Get notified when products are running low or out of stock to maintain optimal inventory levels.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="text-center">
                                <CardHeader>
                                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <DollarSign className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <CardTitle>Value Tracking</CardTitle>
                                    <CardDescription>
                                        Track the total value of your inventory and individual product values with automatic calculations.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="text-center">
                                <CardHeader>
                                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Building className="h-8 w-8 text-red-600 dark:text-red-400" />
                                    </div>
                                    <CardTitle>Supplier Management</CardTitle>
                                    <CardDescription>
                                        Keep track of product suppliers and maintain organized records for better vendor relationships.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>

                    {/* Demo Section */}
                    <div className="mb-16">
                        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur border-2 border-dashed border-gray-300 dark:border-gray-600">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">📊 Dashboard Preview</CardTitle>
                                <CardDescription>
                                    See what your inventory dashboard will look like
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                                                <p className="text-2xl font-bold">247</p>
                                            </div>
                                            <Package className="h-8 w-8 text-blue-500" />
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                                                <p className="text-2xl font-bold">$24,891</p>
                                            </div>
                                            <DollarSign className="h-8 w-8 text-green-500" />
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                                                <p className="text-2xl font-bold text-yellow-600">12</p>
                                            </div>
                                            <AlertTriangle className="h-8 w-8 text-yellow-500" />
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                                                <p className="text-2xl font-bold">8</p>
                                            </div>
                                            <BarChart3 className="h-8 w-8 text-purple-500" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <Button 
                                        size="lg"
                                        onClick={() => router.get('/')}
                                    >
                                        <Package className="h-5 w-5 mr-2" />
                                        Start Managing Your Inventory
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Status Badges Demo */}
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                            🏷️ Product Status Indicators
                        </h3>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <Badge variant="default">In Stock</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <Badge variant="secondary">Low Stock</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-red-500" />
                                <Badge variant="destructive">Out of Stock</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}