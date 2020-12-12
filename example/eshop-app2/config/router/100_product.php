<?php
/**
 * Category routes.
 */
return [
    "routes" => [
        [
            "info" => "Specific product",
            "mount" => "products",
            "handler" => "\Course\Product\ProductController"
        ],
        // [
        //     "info" => "Products",
        //     "requestMethod" => "GET",
        //     "path" => "products/{id:digit}/{gender:digit}",
        //     "callable" => ["productController", "getAllProductsFromCategory"]
        // ],
        // [
        //     "info" => "Under 500kr",
        //     "requestMethod" => "GET",
        //     "path" => "products",
        //     "handler" => "\Course\Product\ProductController"
        // ],
        // [
        //     "info" => "Under 500kr",
        //     "requestMethod" => "GET",
        //     "path" => "products/under500Male",
        //     "callable" => ["productController", "getAllProductsUnder500Male"]
        // ]
    ]
];
