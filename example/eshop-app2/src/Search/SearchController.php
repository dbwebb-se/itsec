<?php

namespace Course\Search;

use Anax\Commons\ContainerInjectableInterface;
use Anax\Commons\ContainerInjectableTrait;

use \Course\Product\Product;


class SearchController implements ContainerInjectableInterface
{
    use ContainerInjectableTrait;



    /**
     * Rendering of search result
     * @method displayResult()
     * @return mixed
     */
    public function indexActionPost()
    {
        $title = "Sökresultat";

        $url = $this->di->get("url");
        $response = $this->di->get("response");

        $db = $this->di->get("dbqb");

        $product = new Product;
        $product->setDb($db);

        if (!isset($_POST["search"])) {
            $redirectUrl = $url->create("");
            $response->redirect($redirectUrl);
            return false;
        }

        $searchString = $_POST["search"];
        $searchResult = $product->searchProducts($searchString);
        $searchResultCount = count($searchResult);

        $data = [
            "searchResultCount" => $searchResultCount,
            "searchResult" => $searchResult
        ];

        return $this->di->get("render")->display($title, "search/search", $data);
    }
}
