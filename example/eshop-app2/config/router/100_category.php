<?php
/**
 * Category routes.
 */
return [
    "routes" => [
        [
            "info" => "All Category",
            "requestMethod" => "GET",
            "mount" => "category",
            "handler" => "\Course\Category\CategoryController"
        ],
        // [
        //     "info" => "Specific category",
        //     "requestMethod" => "GET",
        //     "mount" => "category/{id:digit}",
        //     "handler" => "\Course\Category\CategoryController"
        // ],
        // [
        //     "info" => "Specific subcategory",
        //     "requestMethod" => "GET",
        //     "mount" => "category/{id:digit}/{id:digit}/{gender:digit}",
        //     "handler" => "\Course\Category\CategoryController"
        // ]
    ]
];
