<?php

return [
    "services" => [
        "productController" => [
            "shared" => true,
            "callback" => function () {
                $obj = new \Course\Product\ProductController();
                $obj->setDI($this);
                return $obj;
            }
        ]
    ]
];
