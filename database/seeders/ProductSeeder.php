<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a mix of products with different stock levels
        Product::factory(50)->create();
        
        // Create some specific low stock items
        Product::factory(10)->lowStock()->create();
        
        // Create some out of stock items
        Product::factory(5)->outOfStock()->create();
        
        // Create some well stocked items
        Product::factory(20)->wellStocked()->create();
    }
}