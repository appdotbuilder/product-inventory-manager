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
import { ArrowLeft, Plus } from 'lucide-react';



export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        category: '',
        stock_quantity: 0,
        unit_price: 0,
        supplier: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="mb-6">
                    <Button 
                        variant="ghost" 
                        onClick={() => router.get('/')}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Inventory
                    </Button>
                    
                    <h1 className="text-3xl font-bold">➕ Add New Product</h1>
                    <p className="text-muted-foreground">
                        Create a new product in your inventory
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                        <CardDescription>
                            Fill in the details for your new product
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
                                    onClick={() => router.get('/')}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>Creating...</>
                                    ) : (
                                        <>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Product
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