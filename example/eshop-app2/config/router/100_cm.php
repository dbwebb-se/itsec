<?php
/**
 * Default route to create a 404, use if no else route matched.
 */
return [
    "mount" => "management",
    "routes" => [
        [
            "info" => "Management Most Bought Product",
            "path" => "mostbought",
            "handler" => ["\Course\Management\ManagementController", "displaySettingsMostBought"],
        ],
        [
            "info" => "Management Best Selling Product 1 Month",
            "path" => "bestselling",
            "handler" => ["\Course\Management\ManagementController", "displaySettingsBestSelling"],
        ],
        [
            "info" => "Management",
            "path" => "",
            "handler" => ["\Course\Management\ManagementController", "displaySettingsManagement"],
        ],
    ]
];
