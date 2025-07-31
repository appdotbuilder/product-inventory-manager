<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Product>
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Electronics',
            'Clothing',
            'Books',
            'Home & Garden',
            'Sports',
            'Toys',
            'Health & Beauty',
            'Automotive',
            'Food & Beverages',
            'Office Supplies'
        ];

        $suppliers = [
            'Tech Solutions Inc.',
            'Global Electronics',
            'Fashion Forward Ltd.',
            'Book World Publishers',
            'Garden Plus',
            'Sports Galaxy',
            'Toy Kingdom',
            'Beauty Essentials',
            'Auto Parts Pro',
            'Office Max'
        ];

        return [
            'name' => $this->faker->words(random_int(2, 4), true),
            'description' => $this->faker->optional(0.8)->paragraph(),
            'category' => $this->faker->randomElement($categories),
            'stock_quantity' => $this->faker->numberBetween(0, 100),
            'unit_price' => $this->faker->randomFloat(2, 5.00, 999.99),
            'supplier' => $this->faker->optional(0.7)->randomElement($suppliers),
        ];
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => 0,
        ]);
    }

    /**
     * Indicate that the product has low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => random_int(1, 5),
        ]);
    }

    /**
     * Indicate that the product is well stocked.
     */
    public function wellStocked(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => random_int(50, 200),
        ]);
    }
}