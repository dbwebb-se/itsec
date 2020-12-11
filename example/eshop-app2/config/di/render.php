<?php

return [
    "services" => [
        "render" => [
            "shared" => true,
            "callback" => function () {
                $render = new \Course\Render\Render();
                $render->setDI($this);
                return $render;
            }
        ],
    ]
];
