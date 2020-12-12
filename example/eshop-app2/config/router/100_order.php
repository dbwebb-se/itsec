<?php
/**
 * Category routes.
 */
return [
    "routes" => [
        [
            "info" => "Beställningar",
            "mount" => "orders",
            "handler" => ["\Course\Order\OrderController", "getOrderPage"]
        ],
        [
            "info" => "Beställningar",
            "mount" => "order/{id:digit}",
            "handler" => ["\Course\Order\OrderController", "getSingleOrder"]
        ]
    ]
];
