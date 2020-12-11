<?php

namespace Course\Base;

use Anax\Commons\ContainerInjectableInterface;
use Anax\Commons\ContainerInjectableTrait;
use Course\Base\Base;

use Course\Order\OrderItem;
use Course\Product\Product;
use Course\Category\Category;

class BaseController implements ContainerInjectableInterface
{
    use ContainerInjectableTrait;


    /**
     * This function handles the rendering of frontpage.
     */
    public function indexAction()
    {
        $title = "Frontpage";
        $view = $this->di->get("view");
        $page = $this->di->get("page");
        $db = $this->di->get("dbqb");

        $orderItem = new OrderItem;
        $orderItem->setDb($db);
        $orderItems = $orderItem->getAllOrderItems();

        $product = new Product;
        $product->setDb($db);

        $base = new Base();
        $top10 = $base->getTop10($orderItems, $db);

        $data = [
            "femaleTop10" => $top10[0],
            "maleTop10" => $top10[1]
        ];

        $under500 = [
            "productsUnder500Female" => $product->getProductsUnder500(0, 10),
            "productsUnder500Male" => $product->getProductsUnder500(1, 10),
        ];

        return $this->di->get("render")->display($title, "base/home", [$data, $under500]);
    }
}
