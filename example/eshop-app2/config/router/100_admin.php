<?php
/**
 * Default route to create a 404, use if no else route matched.
 */
return [
    "mount" => "admin",
    "routes" => [
        [
            "info" => "Admin Lägg till kupong",
            // "method" => "GET|POST",
            "path" => "coupon/add",
            "handler" => ["\Course\Admin\AdminController", "displayAddCoupon"],
        ],
        [
            "info" => "Admin",
            "mount" => "",
            "handler" => "\Course\Admin\AdminController",
        ]
    ]
];
