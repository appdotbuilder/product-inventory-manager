import React from 'react';
import { router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import InputError from '@/components/input-error';
import { ArrowLeft, Save } from 'lucide-react';

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



export default function EditProduct({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        category: product.category,
        stock_quantity: product.stock_quantity,
        unit_price: product.unit_price,
        supplier: product.supplier || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="mb-6">
                    <Button 
                        variant="ghost" 
                        onClick={() => router.get(route('products.show', product.id))}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Product
                    </Button>
                    
                    <h1 className="text-3xl font-bold">✏️ Edit Product</h1>
                    <p className="text-muted-foreground">
                        Update product information and details
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                        <CardDescription>
                            Make changes to the product details below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter product name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Input
                                        id="category"
                                        type="text"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="e.g., Electronics, Clothing"
                                        className={errors.category ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.category} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter product description (optional)"
                                    rows={3}
                                    className={errors.description ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="stock_quantity">Stock Quantity *</Label>
                                    <Input
                                        id="stock_quantity"
                                        type="number"
                                        min="0"
                                        value={data.stock_quantity}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('stock_quantity', parseInt(e.target.value) || 0)}
                                        placeholder="0"
                                        className={errors.stock_quantity ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.stock_quantity} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="unit_price">Unit Price ($) *</Label>
                                    <Input
                                        id="unit_price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.unit_price}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('unit_price', parseFloat(e.target.value) || 0)}
                                        placeholder="0.00"
                                        className={errors.unit_price ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.unit_price} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="supplier">Supplier</Label>
                                <Input
                                    id="supplier"
                                    type="text"
                                    value={data.supplier}
                                    onChange={(e) => setData('supplier', e.target.value)}
                                    placeholder="Enter supplier name (optional)"
                                    className={errors.supplier ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.supplier} />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.get(route('products.show', product.id))}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>Saving...</>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}