<?php

namespace Course\Product;

use Anax\Commons\ContainerInjectableInterface;
use Anax\Commons\ContainerInjectableTrait;
use \Course\Product\Product;
use \Course\Category\Category;
use \Course\Pagination\Pagination;

class ProductController implements ContainerInjectableInterface
{
    use ContainerInjectableTrait;



    /**
     * Rendering of specific product.
     * @method getSpecificProduct()
     * @param  int $productId ID of product.
     * @return mixed
     */
    public function getSpecificProduct($productId)
    {
        $product = new Product();
        $product->setDb($this->di->get("dbqb"));
        $data = $product->getProducts("productID", $productId);

        if (empty($data)) {
            $redirect = $this->di->get("url")->create("");
            $this->di->get("response")->redirect($redirect);
            return false;
        }

        return $this->di->get("render")->display("Produkt", "product/product", $data);
    }



    /**
     * Rendering of all products in specific category.
     * @method getAllProductsFromCategory()
     * @param  int  $categoryID category ID
     * @param  int  $genderID  0 = Female, 1 = Male.
     * @return mixed
     */
    public function getAllProductsFromCategory($categoryID, $genderID)
    {
        $category = new Category();
        $category->setDb($this->di->get("dbqb"));
        $productCategory = $category->getSpecificCategory($categoryID);

        $request = $this->di->get("request");

        $amountPerPage = 50;

        $calcOffset = $request->getGet(htmlentities("page")) * $amountPerPage;
        $offset = $request->getGet(htmlentities("page")) == 1 ? 0 : $calcOffset;


        $res = $this->di->get("pagination")->pagination(["productCategoryID", $categoryID, $genderID],
            "getProductsByGender", "getProductsByGender", ["productCategoryID",
            $categoryID, $genderID, $offset], "products", "/$categoryID/$genderID?page=1");

        $data = [
            "products" => $res[0],
            "amountOfProducts" => $res[1],
            "categoryParent" => $productCategory,
        ];

        return $this->di->get("render")->display("Produkter", "product/products", $data);
    }



    /**
     * Rendering of all female products under 500kr
     * @method getAllProductsUnder500Female()
     * @return mixed
     */
    public function under500FemaleAction()
    {
        $products = new Product();
        $products->setDb($this->di->get("dbqb"));

        $request = $this->di->get("request");

        $amountPerPage = 50;
        $calcOffset = $request->getGet(htmlentities("page")) * $amountPerPage;
        $offset = $request->getGet(htmlentities("page")) == 1 ? 0 : $calcOffset;

        $res = $this->di->get("pagination")->pagination([0], "getProductsUnder500", "getProductsUnder500",
            [0, null, $offset], "products", "/under500Female?page=1");

        $data = [
            "under500Female" => $res[0],
            "amountOfProducts" => $res[1]
        ];

        return $this->di->get("render")->display("Produkter under 500kr", "product/under500Female", $data);
    }



    /**
     * Rendering of all male products under 500kr
     * @method getAllProductsUnder500Male()
     * @return mixed
     */
    public function under500MaleAction()
    {
        $products = new Product();
        $products->setDb($this->di->get("dbqb"));

        $request = $this->di->get("request");

        $amountPerPage = 50;
        $calcOffset = $request->getGet(htmlentities("page")) * $amountPerPage;
        $offset = $request->getGet(htmlentities("page")) == 1 ? 0 : $calcOffset;

        $res = $this->di->get("pagination")->pagination([1], "getProductsUnder500", "getProductsUnder500",
            [1, null, $offset], "products", "/under500Male?page=1");

        $data = [
            "under500Male" => $res[0],
            "amountOfProducts" => $res[1]
        ];


        return $this->di->get("render")->display("Produkter under 500kr", "product/under500Male", $data);
    }
}
