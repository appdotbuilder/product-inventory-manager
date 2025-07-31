<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display the main inventory dashboard.
     */
    public function index(Request $request)
    {
        $query = Product::query();

        // Handle search
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Handle category filter
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Handle sorting
        $sortField = $request->get('sort', 'name');
        $sortDirection = $request->get('direction', 'asc');
        
        $allowedSorts = ['name', 'category', 'stock_quantity', 'unit_price', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $products = $query->paginate(10)->withQueryString();

        // Get statistics
        $totalProducts = Product::count();
        $totalValue = Product::sum(\Illuminate\Support\Facades\DB::raw('stock_quantity * unit_price'));
        $lowStockCount = Product::lowStock(10)->count();
        $outOfStockCount = Product::where('stock_quantity', 0)->count();

        // Get unique categories for filter
        $categories = Product::distinct('category')
            ->pluck('category')
            ->sort()
            ->values();

        return Inertia::render('inventory', [
            'products' => $products,
            'categories' => $categories,
            'statistics' => [
                'totalProducts' => $totalProducts,
                'totalValue' => round($totalValue, 2),
                'lowStockCount' => $lowStockCount,
                'outOfStockCount' => $outOfStockCount,
            ],
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'sort' => $sortField,
                'direction' => $sortDirection,
            ],
        ]);
    }
}