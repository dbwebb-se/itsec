<?php

return [
    "services" => [
        "userController" => [
            "shared" => true,
            "callback" => function () {
                $obj = new \Course\User\UserController();
                $obj->setDI($this);
                return $obj;
            }
        ],
    ]
];
