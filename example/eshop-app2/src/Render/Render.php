<?php
namespace Course\Render;

use Anax\Commons\ContainerInjectableInterface;
use Anax\Commons\ContainerInjectableTrait;

class Render implements ContainerInjectableInterface
{
    use ContainerInjectableTrait;



    /**
     * This function will render page.
     * @method display()
     * @param  string $title title of page.
     * @param  string $page  page to render.
     * @param  array  $data  data to render.
     * @return void
     */
    public function display($title, $template, $data = []) {
        $view = $this->di->get("view");
        $page = $this->di->get("page");

        $view->add($template, $data);
        return $page->render(["title" => $title]);
    }
}
