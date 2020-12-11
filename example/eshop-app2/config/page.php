<?php
/**
 * Configuration file for page which can create and put together web pages
 * from a collection of views. Through configuration you can add the
 * standard parts of the page, such as header, navbar, footer, stylesheets,
 * javascripts and more.
 */
return [
    // This layout view is the base for rendering the page, it decides on where
    // all the other views are rendered.
    "layout" => [
        "template" => "defaults/default",
        //"template" => "anax/v2/layout/dbwebb_se",
        //"template" => "anax/v2/layout/anax",
        "region" => "layout",
        "sort" => null,
        "data" => [
            "baseTitle" => " | Anax",
            "favicon" => "favicon.ico",
            "bodyClass" => null,
            "htmlClass" => null,
            "lang" => "sv",
            "stylesheets" => [
                "../vendor/twbs/bootstrap/dist/css/bootstrap.min.css",
                "../vendor/components/font-awesome/css/all.min.css",
                "css/style.css",
            ],
            "javascripts" => [
                "../vendor/components/jquery/jquery.min.js",
                "../vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js",
                "js/product.js",
                "js/cart.js",
            ],
        ],
    ],

    "views" => [
        [
            "region" => "header",
            "template" => "defaults/header",
            "data" => [],
        ],
        [
            "region" => "navbar",
            "template" => "navbar/navbar",
            "data" => [],
        ],
        [
            "region" => "footer",
            "template" => "defaults/footer",
            "data" => [],
        ],
    ]
];
