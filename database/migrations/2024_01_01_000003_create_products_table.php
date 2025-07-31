<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->text('description')->nullable()->comment('Product description');
            $table->string('category')->comment('Product category');
            $table->integer('stock_quantity')->default(0)->comment('Current stock quantity');
            $table->decimal('unit_price', 10, 2)->comment('Unit price in currency');
            $table->string('supplier')->nullable()->comment('Product supplier');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('category');
            $table->index('stock_quantity');
            $table->index(['category', 'name']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};