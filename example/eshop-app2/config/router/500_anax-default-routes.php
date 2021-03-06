<?php
/**
 * Anax default setup of routes, place in order of evaluation.
 */
return [
    "routes" => [
        [
            "mount"     => "dev",
            "handler"   => "\Anax\Controller\DevelopmentController",
            "info"      => "Development and debugging information.",
        ],
        [
            "mount"     => "s",
            "handler"   => "\Anax\Controller\SampleController",
            "info"      => "Moped.",
        ],
        [
            "mount"     => null,
            "handler"   => "\Anax\Content\FileBasedContentController",
            "info"      => "Flat file content controller.",
        ],
    ]
];
