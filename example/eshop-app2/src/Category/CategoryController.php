<?php

namespace Course\Category;

use Anax\Commons\ContainerInjectableInterface;
use Anax\Commons\ContainerInjectableTrait;
use \Course\Category\Category;

class CategoryController implements ContainerInjectableInterface
{
    use ContainerInjectableTrait;


    /**
     * This function handles the rendering of all categories in the database.
     */
    public function indexAction()
    {
        $category = new Category();
        $category->setDb($this->di->get("dbqb"));

        $data = [
            "categoriesFemale" => $category->getAllCategoriesGender(0),
            "categoriesMale" => $category->getAllCategoriesGender(1)
        ];

        return $this->di->get("render")->display("Kategorier", "category/categories", $data);
    }



    /**
     * Renders the page for subcategories.
     *
     * @param integer $parentID ID to parent category
     *
     */
    public function argumentActionGet($parentID)
    {
        $category = new Category();
        $category->setDb($this->di->get("dbqb"));

        $title = $category->getSpecificCategory($parentID);
        $categories = $category->getAllSubCategories($parentID);

        if (empty($title) || empty($categories)) {
            $redirect = $this->di->get("url")->create("");
            $this->di->get("response")->redirect($redirect);
            return false;
        }

        $data = [
            "title" => $title,
            "categories" => $categories
        ];

        return $this->di->get("render")->display("Kategori", "category/specificCategory", $data);
    }
}
