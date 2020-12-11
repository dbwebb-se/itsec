<?php

return [
    "services" => [
        "adminController" => [
            "shared" => true,
            "callback" => function () {
                $obj = new \Course\Admin\AdminController();
                $obj->setDI($this);
                return $obj;
            }
        ],
    ]
];
