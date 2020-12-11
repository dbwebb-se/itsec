<?php

return [
    "services" => [
        "categoryController" => [
            "shared" => true,
            "callback" => function () {
                $obj = new \Course\Category\CategoryController();
                $obj->setDI($this);
                return $obj;
            }
        ],
    ]
];
