<?php

namespace Course\Admin;

use Anax\Commons\ContainerInjectableInterface;
use Anax\Commons\ContainerInjectableTrait;

use \Course\User\User;
use \Course\Product\Product;
use \Course\Order\Orders;
use \Course\Order\OrderItem;
use \Course\Coupon\Coupon;

use \Course\Admin\HTMLForm\AdminUpdateProductForm;
use \Course\Admin\HTMLForm\AdminBuyFemaleForm;
use \Course\Admin\HTMLForm\AdminBuyMaleForm;
use \Course\Admin\HTMLForm\CouponCreateForm;



class AdminController implements ContainerInjectableInterface
{
    use ContainerInjectableTrait;

    /**
     * Render admin settings.
     */
    public function indexAction()
    {
        $this->checkIfAdmin();
        return $this->di->get("render")->display("Admin", "admin/admin");
    }



    /**
     * Render admin products.
     */
    public function productsAction()
    {
        $this->checkIfAdmin();

        $request = $this->di->get("request");

        $amountPerPage = 50;
        $calcOffset = $request->getGet(htmlentities("page")) * $amountPerPage;
        $offset = $request->getGet(htmlentities("page")) == 1 ? 0 : $calcOffset;

        $res = $this->di->get("pagination")->pagination(
            [],
            "getAllProducts",
            "getAllProducts",
            [$offset],
            "admin",
            "/products?page=1"
        );

        $data = [
            "products" => $res[0],
            "amountOfProducts" => $res[1]
        ];

        return $this->di->get("render")->display("Admin | Produkter", "admin/products", $data);
    }



    /**
     * Render admin users.
     */
    public function usersAction()
    {
        $this->checkIfAdmin();
        $user = new User();
        $user->setDb($this->di->get("dbqb"));

        $data = [
            "users" => $user->getAllUsers()
        ];

        return $this->di->get("render")->display("Admin | Användare", "admin/users", $data);
    }



    /**
     * Render products with low amount.
     */
    public function lowAction()
    {
        $this->checkIfAdmin();

        $request = $this->di->get("request");

        $amountPerPage = 50;
        $calcOffset = $request->getGet(htmlentities("page")) * $amountPerPage;
        $offset = $request->getGet(htmlentities("page")) == 1 ? 0 : $calcOffset;

        $res = $this->di->get("pagination")->pagination(
            [],
            "getProductsWithLowAmount",
            "getProductsWithLowAmount",
            [$offset],
            "admin",
            "/low?page=1"
        );

        $data = [
            "products" => $res[0],
            "amountOfProducts" => $res[1]
        ];

        return $this->di->get("render")->display("Admin | Lågt antal", "admin/low", $data);
    }



    /**
     * Render admin orders.
     */
    public function ordersAction()
    {
        $this->checkIfAdmin();
        $order = new Orders();
        $order->setDb($this->di->get("dbqb"));

        $data = [
            "orders" => $order->getAllOrders(),
        ];

        return $this->di->get("render")->display("Admin | Ordrar", "admin/orders", $data);
    }



    /**
     * Render admin single order.
     */
    public function orderActionGet($orderID)
    {
        $this->checkIfAdmin();
        $order = new Orders();
        $order->setDb($this->di->get("dbqb"));
        $orders = $order->getAllOrders();

        $orderNumbers = $this->getOrderNumbers($orders);

        if (in_array($orderID, $orderNumbers)) {
            $product = new Product();
            $product->setDb($this->di->get("dbqb"));

            $orderItem = new OrderItem();
            $orderItem->setDb($this->di->get("dbqb"));

            $getOrder = $order->getOrderByID($orderID);

            $user = new User();
            $user->setDb($this->di->get("dbqb"));
            $userInfo = $user->getUserInformationById($getOrder->userID);

            $items = $orderItem->getAllItemsWhereID($orderID);

            $products = [];

            foreach ($items as $value) {
                $productItem = $product->getProductByID($value->productID);
                $res = array_merge_recursive((array) $productItem, (array) $value);
                $products[] = $res;
            }

            $coupon = null;

            if ($order->couponID !== null) {
                $coupon = new Coupon();
                $coupon->setDb($this->di->get("dbqb"));
                $coupon->getCoupon($order->couponID);
            }

            $shippingAndWeight = $this->di->get("calc")->calcShipping($products, "productAmount");

            $data = [
                "userInfo" => $userInfo,
                "coupon" => $coupon,
                "orderItems" => $products,
                "price" => $order->getOrderByID($orderID)->price,
                "shipping" => $shippingAndWeight[0],
                "weight" => $shippingAndWeight[1],
                "amountOfItems" => $this->di->get("calc")->calcAmount($products, "productAmount"),
            ];

            return $this->di->get("render")->display("Admin | Order", "admin/order", $data);
        }

        $url = $this->di->get("url")->create("admin/orders");
        return $this->di->get("response")->redirect($url);
    }



    /**
     * Render admin buy product female.
     */
    public function buyFemaleAction()
    {
        $this->checkIfAdmin();
        $buyForm = new AdminBuyFemaleForm($this->di);

        $buyForm->check();

        $data = [
            "content" => $buyForm->getHTML(),
        ];

        return $this->di->get("render")->display("Admin | Köp Product", "default1/article", $data);
    }



    /**
     * Render admin buy product male.
     */
    public function buyMaleAction()
    {
        $this->checkIfAdmin();
        $buyForm = new AdminBuyMaleForm($this->di);

        $buyForm->check();

        $data = [
            "content" => $buyForm->getHTML(),
        ];

        return $this->di->get("render")->display("Admin | Köp Product", "default1/article", $data);
    }



    /**
     * Render admin edit product.
     */
    public function editAction($productID)
    {
        $this->checkIfAdmin();
        $updateForm = new AdminUpdateProductForm($this->di, $productID);

        $updateForm->check();

        $data = [
            "content" => $updateForm->getHTML(),
        ];

        return $this->di->get("render")->display("Admin | Köp Product", "default1/article", $data);
    }


    /**
     * Page for adding new coupons.
     *
     * @return void
     */
    public function couponAction()
    {
        $this->checkIfAdmin();
        $form = new CouponCreateForm($this->di);

        $form->check();

        $data = [
            "content" => $form->getHTML(),
        ];

        return $this->di->get("render")->display("Admin | Lägg till kupong", "default1/article", $data);
    }



    /**
     * Checks if user is admin.
     * @method checkIfAdmin()
     * @return mixed
     */
    private function checkIfAdmin()
    {
        $url = $this->di->get("url");
        $response = $this->di->get("response");
        $session = $this->di->get("session");
        $db = $this->di->get("dbqb");
        $login = $url->create("user/login");

        $user = new User();
        $user->setDb($db);

        $email = $session->get("email");

        if ($user->getPermission($email) == 1) {
            return true;
        }

        $response->redirect($login);
        return false;
    }


    /**
     * This function will return all orderIDs.
     * @method getOrderNumbers()
     * @param  array $orders all orders in database.
     * @return array array with all orderiDs.
     */
    private function getOrderNumbers($orders)
    {
        $orderNumbers = [];
        foreach ((array) $orders as $order) {
            array_push($orderNumbers, $order->orderID);
        }
        return $orderNumbers;
    }
}
