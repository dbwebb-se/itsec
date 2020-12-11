<?php

namespace Anax\View;

/**
 * A layout rendering views in defined regions.
 */

// Show incoming variables and view helper functions
//echo showEnvironment(get_defined_vars(), get_defined_functions());

$req_uri = $_SERVER['REQUEST_URI'];

if (strpos($req_uri, "?") !== false) {
    $pathClass = substr($req_uri, 0, strrpos($req_uri, '?'));
    $pathClass = basename($path);
} elseif (is_numeric(basename($req_uri))) {
    $pathClass = substr($req_uri, 0, strrpos($req_uri, "/"));
    $pathClass = basename($path);
} else {
    $pathClass = basename($req_uri);
}

$title = ($title ?? "No title") . ($baseTitle ?? " | No base title defined");

?>
<!doctype html>
<html class="<?= $pathClass ?>">
<head>
    <meta charset="utf-8">
    <title><?= $title ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php if (isset($favicon)) : ?>
        <link rel="icon" href="<?= $favicon ?>">
    <?php endif; ?>

    <?php if (isset($stylesheets)) : ?>
        <?php foreach ($stylesheets as $stylesheet) : ?>
            <link rel="stylesheet" type="text/css" href="<?= asset($stylesheet) ?>">
        <?php endforeach; ?>
    <?php endif; ?>

</head>

<body>

    <!-- header -->
    <?php if (regionHasContent("header")) : ?>
        <div class="header-wrap">
            <?php renderRegion("header") ?>
        </div>
    <?php endif; ?>

    <!-- navbar -->
    <?php if (regionHasContent("navbar")) : ?>
        <div class="navbar-wrap">
            <?php renderRegion("navbar") ?>
        </div>
    <?php endif; ?>

    <!-- main -->
    <?php if (regionHasContent("main")) : ?>
        <main class="main-wrap">
            <?php renderRegion("main") ?>
        </main>
    <?php endif; ?>

    <!-- footer -->
    <?php if (regionHasContent("footer")) : ?>
        <div class="footer-wrap">
            <?php renderRegion("footer") ?>
        </div>
    <?php endif; ?>

    <?php if (isset($javascripts)) : ?>
        <?php foreach ($javascripts as $javascript) : ?>
            <script async src="<?= asset($javascript) ?>"></script>
        <?php endforeach; ?>
    <?php endif; ?>

</body>

</html>
