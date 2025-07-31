<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_product(): void
    {
        $productData = [
            'name' => 'Test Product',
            'description' => 'A test product description',
            'category' => 'Electronics',
            'stock_quantity' => 10,
            'unit_price' => 99.99,
            'supplier' => 'Test Supplier',
        ];

        $response = $this->post(route('products.store'), $productData);

        $response->assertRedirect();
        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'category' => 'Electronics',
            'stock_quantity' => 10,
            'unit_price' => 99.99,
        ]);
    }

    public function test_can_view_product(): void
    {
        $product = Product::factory()->create();

        $response = $this->get(route('products.show', $product));

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('products/show')
                   ->where('product.id', $product->id)
                   ->where('product.name', $product->name)
        );
    }

    public function test_can_update_product(): void
    {
        $product = Product::factory()->create();

        $updateData = [
            'name' => 'Updated Product Name',
            'description' => 'Updated description',
            'category' => 'Updated Category',
            'stock_quantity' => 25,
            'unit_price' => 149.99,
            'supplier' => 'Updated Supplier',
        ];

        $response = $this->put(route('products.update', $product), $updateData);

        $response->assertRedirect();
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated Product Name',
            'category' => 'Updated Category',
            'stock_quantity' => 25,
            'unit_price' => 149.99,
        ]);
    }

    public function test_can_delete_product(): void
    {
        $product = Product::factory()->create();

        $response = $this->delete(route('products.destroy', $product));

        $response->assertRedirect();
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    public function test_product_validation_works(): void
    {
        $response = $this->post(route('products.store'), [
            'name' => '',
            'category' => '',
            'stock_quantity' => -1,
            'unit_price' => -10,
        ]);

        $response->assertSessionHasErrors([
            'name',
            'category',
            'stock_quantity',
            'unit_price',
        ]);
    }

    public function test_can_search_products(): void
    {
        Product::factory()->create(['name' => 'iPhone 15']);
        Product::factory()->create(['name' => 'Samsung Galaxy']);
        Product::factory()->create(['description' => 'iPhone accessories']);

        $response = $this->get(route('products.index', ['search' => 'iPhone']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('products/index')
                   ->where('filters.search', 'iPhone')
        );
    }

    public function test_low_stock_scope_works(): void
    {
        Product::factory()->create(['stock_quantity' => 0]);
        Product::factory()->create(['stock_quantity' => 5]);
        Product::factory()->create(['stock_quantity' => 15]);
        Product::factory()->create(['stock_quantity' => 8]);

        $lowStockProducts = Product::lowStock(10)->get();

        $this->assertCount(3, $lowStockProducts);
    }
}