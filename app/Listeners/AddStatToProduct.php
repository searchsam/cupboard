<?php

namespace App\Listeners;

use App\Events\ApproveRequest;
use App\Product;
use Illuminate\Contracts\Queue\ShouldQueue;

class AddStatToProduct implements ShouldQueue
{

    /**
     * Handle the event.
     *
     * @param  ApproveRequest  $event
     * @return void
     */
    public function handle(ApproveRequest $event)
    {
         $productName = $event->request->description;
         $product = Product::where('name', strtoupper($productName))->get();

         if ($product->isNotEmpty()) {
             $product->increment('stat');
         } else {
             Product::insert(['name' => strtoupper($productName), 'stat' => 1]);
         }
    }
}
