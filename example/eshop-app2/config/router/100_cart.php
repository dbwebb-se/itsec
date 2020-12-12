<?php
/**
 * Category routes.
 */
return [
    "mount" => "cart",
    "routes" => [
        [
            "info" => "Kassa",
            "requestMethod" => "GET",
            "path" => "checkout",
            "handler" => ["\Course\Cart\CartController", "displayCheckout"]
        ],
        [
            "info" => "Beställning lagd",
            "requestMethod" => "GET | POST",
            "path" => "order",
            "handler" => ["\Course\Cart\CartController", "displayOrder"]
        ],
        [
            "info" => "Kundvagn",
            "requestMethod" => "GET",
            "path" => "",
            "handler" => ["\Course\Cart\CartController", "displayCart"]
        ],
    ]
];
