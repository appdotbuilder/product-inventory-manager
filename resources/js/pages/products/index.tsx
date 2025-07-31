import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
    Plus, 
    Search, 
    Edit,
    Trash2,
    Eye,
    ArrowLeft
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

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Filters {
    search?: string;
    category?: string;
    sort: string;
    direction: string;
}

interface Props {
    products: PaginatedProducts;
    categories: string[];
    filters: Filters;
    [key: string]: unknown;
}

export default function ProductIndex({ products, categories, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedCategory) params.set('category', selectedCategory);
        params.set('sort', filters.sort);
        params.set('direction', filters.direction);
        
        router.get(route('products.index'), Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSort = (field: string) => {
        const direction = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedCategory) params.set('category', selectedCategory);
        params.set('sort', field);
        params.set('direction', direction);
        
        router.get(route('products.index'), Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (product: Product) => {
        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            router.delete(route('products.destroy', product.id), {
                preserveScroll: true,
            });
        }
    };

    const getStockBadge = (quantity: number) => {
        if (quantity === 0) {
            return <Badge variant="destructive">Out of Stock</Badge>;
        } else if (quantity <= 10) {
            return <Badge variant="secondary">Low Stock</Badge>;
        }
        return <Badge variant="default">In Stock</Badge>;
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <Button 
                            variant="ghost" 
                            onClick={() => router.get('/')}
                            className="mb-2"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                        <h1 className="text-3xl font-bold">📦 All Products</h1>
                        <p className="text-muted-foreground">
                            Manage all products in your inventory
                        </p>
                    </div>
                    <Button onClick={() => router.get(route('products.create'))}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </Button>
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Search & Filter Products</CardTitle>
                        <CardDescription>
                            Find products by name, description, category, or supplier
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                            </div>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={handleSearch}>
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Products Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Products ({products.total})</CardTitle>
                        <CardDescription>
                            Showing {products.data.length} of {products.total} products
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead 
                                            className="cursor-pointer hover:bg-muted/50"
                                            onClick={() => handleSort('name')}
                                        >
                                            Name {filters.sort === 'name' && (filters.direction === 'asc' ? '↑' : '↓')}
                                        </TableHead>
                                        <TableHead 
                                            className="cursor-pointer hover:bg-muted/50"
                                            onClick={() => handleSort('category')}
                                        >
                                            Category {filters.sort === 'category' && (filters.direction === 'asc' ? '↑' : '↓')}
                                        </TableHead>
                                        <TableHead 
                                            className="text-right cursor-pointer hover:bg-muted/50"
                                            onClick={() => handleSort('stock_quantity')}
                                        >
                                            Stock {filters.sort === 'stock_quantity' && (filters.direction === 'asc' ? '↑' : '↓')}
                                        </TableHead>
                                        <TableHead 
                                            className="text-right cursor-pointer hover:bg-muted/50"
                                            onClick={() => handleSort('unit_price')}
                                        >
                                            Price {filters.sort === 'unit_price' && (filters.direction === 'asc' ? '↑' : '↓')}
                                        </TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Supplier</TableHead>
                                        <TableHead 
                                            className="cursor-pointer hover:bg-muted/50"
                                            onClick={() => handleSort('created_at')}
                                        >
                                            Added {filters.sort === 'created_at' && (filters.direction === 'asc' ? '↑' : '↓')}
                                        </TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.data.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">
                                                <div>
                                                    <div className="font-semibold">{product.name}</div>
                                                    {product.description && (
                                                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                            {product.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{product.category}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-mono">
                                                {product.stock_quantity}
                                            </TableCell>
                                            <TableCell className="text-right font-mono">
                                                {formatCurrency(product.unit_price)}
                                            </TableCell>
                                            <TableCell>
                                                {getStockBadge(product.stock_quantity)}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {product.supplier || '-'}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(product.created_at)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => router.get(route('products.show', product.id))}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => router.get(route('products.edit', product.id))}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(product)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="flex justify-center mt-6">
                                <div className="flex gap-2">
                                    {products.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}