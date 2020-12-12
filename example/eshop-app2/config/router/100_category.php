<?php
/**
 * Category routes.
 */
return [
    "mount" => "category",
    "routes" => [
        [
            "info" => "Specific category",
            "method" => "GET",
            "path" => "{id:digit}",
            "handler" => ["\Course\Category\CategoryController", "getSpecificCategory"]
        ],
        // [
        //     "info" => "Specific subcategory",
        //     "requestMethod" => "GET",
        //     "path" => "category/{id:digit}/{id:digit}/{gender:digit}",
        //     "handler" => ["\Course\Category\CategoryController", "getSpecificCategory"]
        // ],
        [
            "info" => "All Category",
            "method" => "GET",
            "path" => "",
            "handler" => "\Course\Category\CategoryController"
        ],
    ]
];
