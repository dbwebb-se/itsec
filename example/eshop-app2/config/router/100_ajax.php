<?php
/**
 * Default route to create a 404, use if no else route matched.
 */
return [
    "mount" => "ajax",
    "routes" => [
        [
            "info" => "Ta bort från kundvagnen",
            "requestMethod" => "POST",
            "path" => "remove",
            "handler" => ["\Course\Ajax\AjaxController", "removeFromCart"]
        ],
        [
            "info" => "Ta bort allt från kundvagnen",
            "requestMethod" => "POST",
            "path" => "removeall",
            "handler" => ["\Course\Ajax\AjaxController", "removeAllFromCart"]
        ],
        [
            "info" => "Ta bort produkt",
            "requestMethod" => "POST",
            "path" => "removeProduct",
            "handler" => ["\Course\Ajax\AjaxController", "removeProduct"]
        ],
        [
            "info" => "Uppdatera antal av en product",
            "requestMethod" => "POST",
            "path" => "plusProduct",
            "handler" => ["\Course\Ajax\AjaxController", "plusProduct"]
        ],
        [
            "info" => "Uppdatera antal av en product",
            "requestMethod" => "POST",
            "path" => "minusProduct",
            "handler" => ["\Course\Ajax\AjaxController", "minusProduct"]
        ],
        [
            "info" => "Validera en kupong",
            "requestMethod" => "POST",
            "path" => "validateCoupon",
            "handler" => ["\Course\Ajax\AjaxController", "validateCoupon"]
        ],
        [
            "info" => "Basket handler",
            "requestMethod" => "POST",
            "path" => "",
            "handler" => ["\Course\Ajax\AjaxController", "addToCart"],
        ],
    ]
];
