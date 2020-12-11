<?php

return [
    "services" => [
        "searchController" => [
            "shared" => true,
            "callback" => function () {
                $obj = new \Course\Search\SearchController();
                $obj->setDI($this);
                return $obj;
            }
        ]
    ]
];




