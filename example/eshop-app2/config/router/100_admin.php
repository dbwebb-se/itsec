<?php
/**
 * Default route to create a 404, use if no else route matched.
 */
return [
    "routes" => [
        [
            "info" => "Admin",
            "mount" => "admin",
            "handler" => "\Course\Admin\AdminController",
        ],
        // [
        //     "info" => "Admin Lägg till kupong",
        //     "requestMethod" => "GET|POST",
        //     "mount" => "admin/coupon/add",
        //     "handler" => ["adminController", "displayAddCoupon"],
        // ]
    ]
];
