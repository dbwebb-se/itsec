<?php

namespace Course\Management;

use Anax\Commons\ContainerInjectableInterface;
use Anax\Commons\ContainerInjectableTrait;

use \Course\User\User;
use \Course\Order\OrderItem;
use \Course\Order\Orders;
use \Course\Product\Product;
use \Course\Management\Management;

class ManagementController implements ContainerInjectableInterface
{
    use ContainerInjectableTrait;

    /**
     * Rendering of management settings.
     * @method displaySettingsManagement()
     * @return void
     */
    public function displaySettingsManagement()
    {
        $this->checkIfManagement();
        return $this->di->get("render")->display("Management", "management/management");
    }



    /**
     * Rendering of most bought products.
     * @method displaySettingsMostBought()
     * @return void
     */
    public function displaySettingsMostBought()
    {
        $this->checkIfManagement();
        $db = $this->di->get("dbqb");

        $orderItems = new OrderItem();
        $orderItems->setDb($db);


        $product = new Product();
        $product->setDb($db);

        $orderItem = new OrderItem();
        $orderItem->setDb($db);

        $items = $orderItems->getMostBoughtProducts();

        $products = [];

        foreach ($items as $value) {
            $productItem = $product->getProductByID($value->productID);
            $res = array_merge_recursive((array) $productItem, (array) $value);
            $products[] = $res;
        }

        $data = [
            'products' => $products
        ];

        return $this->di->get("render")->display("Management Mest Köpta", "management/mostbought", $data);
    }



    /**
     * Rendering of best selling products.
     * @method displaySettingsBestSelling()
     * @return void
     */
    public function displaySettingsBestSelling()
    {
        $this->checkIfManagement();
        $db = $this->di->get("dbqb");

        $management = new Management();
        $orders = $management->getAllOrders1Month($db);

        $orderItems = $management->getAllOrderItems($orders, $db);

        $products = $management->getAllProductsFromOrderItem($orderItems, $db);

        foreach ($products as $key => $value) {
            $totalBought[$key] = $value->totalBought;
        }

        array_multisort($totalBought, SORT_DESC, $products);

        $data = [
            "products" => $products
        ];

        return $this->di->get("render")->display("Management Bästsäljande", "management/bestselling", $data);
    }



    /**
     * This function will check if user is management.
     * @method checkIfManagement()
     * @return mixed
     */
    private function checkIfManagement()
    {
        $session = $this->di->get("session");
        $db = $this->di->get("dbqb");

        $user = new User();
        $user->setDb($db);

        $email = $session->get("email");

        if ($user->getPermission($email) == 2) {
            return true;
        }

        $url = $this->di->get("url")->create("user/login");
        return $this->di->get("response")->redirect($url);
    }
}
