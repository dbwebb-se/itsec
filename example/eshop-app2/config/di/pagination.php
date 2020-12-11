<?php

return [
    "services" => [
        "pagination" => [
            "shared" => true,
            "callback" => function () {
                $pagination = new \Course\Pagination\Pagination();
                $pagination->setDI($this);
                return $pagination;
            }
        ]
    ]
];


