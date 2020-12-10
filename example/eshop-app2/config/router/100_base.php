<?php
/**
 * Base routes.
 */
return [
    "routes" => [
        [
            "info" => "Home",
            //"requestMethod" => "GET",
            //"path" => "a",
            "mount" => null,
            //"callable" => ["baseController", "frontpage"],
            //"callable" => ["\Course\Base\BaseController"],
            "handler"   => "\Course\Base\BaseController",
        ],
    ]
];
