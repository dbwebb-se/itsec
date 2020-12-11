<?php

return [
    "services" => [
        "navbar" => [
            "shared" => true,
            "callback" => function () {
                $navbar = new \Course\Navbar\Navbar();
                $navbar->setDI($this);
                $cfg = $this->get("configuration");
                $config = $cfg->load("navbar");

                $navbar->setOptions($config);

                return $navbar;
            }
        ],
    ]
];
