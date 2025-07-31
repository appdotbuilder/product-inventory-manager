<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InventoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_inventory_page_displays_successfully(): void
    {
        Product::factory()->create([
            'name' => 'Test Product',
            'category' => 'Electronics',
            'stock_quantity' => 10,
            'unit_price' => 99.99,
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('inventory')
                   ->has('products.data')
                   ->has('statistics')
                   ->has('categories')
        );
    }

    public function test_can_search_products(): void
    {
        Product::factory()->create(['name' => 'iPhone 15']);
        Product::factory()->create(['name' => 'Samsung Galaxy']);

        $response = $this->get('/?search=iPhone');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('inventory')
                   ->where('filters.search', 'iPhone')
        );
    }

    public function test_can_filter_by_category(): void
    {
        Product::factory()->create(['category' => 'Electronics']);
        Product::factory()->create(['category' => 'Clothing']);

        $response = $this->get('/?category=Electronics');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('inventory')
                   ->where('filters.category', 'Electronics')
        );
    }

    public function test_displays_correct_statistics(): void
    {
        // Create products with different stock levels
        Product::factory()->create(['stock_quantity' => 0, 'unit_price' => 100]); // Out of stock
        Product::factory()->create(['stock_quantity' => 5, 'unit_price' => 50]);  // Low stock
        Product::factory()->create(['stock_quantity' => 20, 'unit_price' => 25]); // Normal stock

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('inventory')
                   ->where('statistics.totalProducts', 3)
                   ->where('statistics.outOfStockCount', 1)
                   ->where('statistics.lowStockCount', 2) // Both 0 and 5 are <= 10
        );
    }
}