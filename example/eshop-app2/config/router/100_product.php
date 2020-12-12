<?php
/**
 * Category routes.
 */
return [
    "mount" => "product",
    "routes" => [
        [
            "info" => "Specific product",
            "path" => "{id:digit}",
            "handler" => ["\Course\Product\ProductController", "getSpecificProduct"]
        ],
        [
            "info" => "Products",
            "path" => "{id:digit}/{gender:digit}",
            "handler" => ["\Course\Product\ProductController", "getAllProductsFromCategory"]
        ],
        [
            "info" => "Under 500kr",
            "path" => "under500Female",
            "handler" => ["\Course\Product\ProductController", "under500FemaleAction"]
        ],
        [
            "info" => "Under 500kr",
            "path" => "under500Male",
            "handler" => ["\Course\Product\ProductController", "under500MaleAction"]
        ]
    ]
];
