<?php

return [
    "services" => [
        "calc" => [
            "shared" => true,
            "callback" => function () {
                $calc = new \Course\Calc\Calc();
                $calc->setDI($this);
                return $calc;
            }
        ]
    ]
];
