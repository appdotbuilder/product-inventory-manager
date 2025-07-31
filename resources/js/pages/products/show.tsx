import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
    ArrowLeft, 
    Edit, 
    Trash2, 
    Package, 
    DollarSign, 
    Calendar,
    Building,
    AlertTriangle,
    CheckCircle,
    XCircle
} from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description?: string;
    category: string;
    stock_quantity: number;
    unit_price: number;
    supplier?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    product: Product;
    [key: string]: unknown;
}

export default function ShowProduct({ product }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            router.delete(route('products.destroy', product.id));
        }
    };

    const getStockStatus = () => {
        if (product.stock_quantity === 0) {
            return {
                icon: <XCircle className="h-5 w-5 text-red-500" />,
                label: 'Out of Stock',
                variant: 'destructive' as const,
                color: 'text-red-600'
            };
        } else if (product.stock_quantity <= 10) {
            return {
                icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
                label: 'Low Stock',
                variant: 'secondary' as const,
                color: 'text-yellow-600'
            };
        }
        return {
            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
            label: 'In Stock',
            variant: 'default' as const,
            color: 'text-green-600'
        };
    };

    const stockStatus = getStockStatus();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const totalValue = product.stock_quantity * product.unit_price;

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-6">
                    <Button 
                        variant="ghost" 
                        onClick={() => router.get('/')}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Inventory
                    </Button>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <p className="text-muted-foreground">
                                Product Details & Information
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                onClick={() => router.get(route('products.edit', product.id))}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Product
                            </Button>
                            <Button 
                                variant="destructive" 
                                onClick={handleDelete}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Product Information */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Product Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                        Product Name
                                    </h3>
                                    <p className="text-lg font-medium mt-1">{product.name}</p>
                                </div>

                                {product.description && (
                                    <div>
                                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                            Description
                                        </h3>
                                        <p className="mt-1 text-gray-700">{product.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                            Category
                                        </h3>
                                        <Badge variant="outline" className="mt-1">
                                            {product.category}
                                        </Badge>
                                    </div>

                                    {product.supplier && (
                                        <div>
                                            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                                Supplier
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Building className="h-4 w-4 text-muted-foreground" />
                                                <span>{product.supplier}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Timestamps
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                            Date Added
                                        </h3>
                                        <p className="mt-1">{formatDate(product.created_at)}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                            Last Updated
                                        </h3>
                                        <p className="mt-1">{formatDate(product.updated_at)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stock and Pricing Information */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    Pricing & Stock
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="text-center p-6 bg-muted/50 rounded-lg">
                                    <div className="text-3xl font-bold">
                                        {formatCurrency(product.unit_price)}
                                    </div>
                                    <p className="text-sm text-muted-foreground">Unit Price</p>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Stock Quantity</span>
                                        <span className="text-xl font-bold font-mono">
                                            {product.stock_quantity}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Status</span>
                                        <div className="flex items-center gap-2">
                                            {stockStatus.icon}
                                            <Badge variant={stockStatus.variant}>
                                                {stockStatus.label}
                                            </Badge>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Total Value</span>
                                        <span className="text-lg font-bold">
                                            {formatCurrency(totalValue)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stock Alert */}
                        {product.stock_quantity <= 10 && (
                            <Card className="border-yellow-200 bg-yellow-50">
                                <CardHeader>
                                    <CardTitle className="text-yellow-800 flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5" />
                                        Stock Alert
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-yellow-700 text-sm">
                                        {product.stock_quantity === 0 
                                            ? 'This product is out of stock and needs to be restocked immediately.'
                                            : 'This product has low stock levels. Consider restocking soon.'
                                        }
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}