<?php

namespace Course\User;

use Anax\Commons\ContainerInjectableInterface;
use Anax\Commons\ContainerInjectableTrait;
use \Course\User\HTMLForm\UserLoginForm;
use \Course\User\HTMLForm\UserCreateForm;
use \Course\User\HTMLForm\UserUpdateForm;

/**
 * A controller class.
 *
 * @SuppressWarnings(PHPMD.TooManyPublicMethods)
 */
class UserController implements ContainerInjectableInterface
{
    use ContainerInjectableTrait;



    /**
     * Rendering of login page.
     * @method getLoginPage()
     * @return mixed
     */
    public function loginAction()
    {
        if ($this->di->get("session")->has("email")) {
            $url = $this->di->get("url")->create("user/profile");
            return $this->di->get("response")->redirect($url);
        }

        $loginForm = new UserLoginForm($this->di);

        $loginForm->check();

        $data = [
            "content" => $loginForm->getHTML(),
        ];

        return $this->di->get("render")->display("Inloggning", "default1/article", $data);
    }



    /**
     * Rendering of create user page.
     * @method getCreatePage()
     * @return void
     */
    public function createAction()
    {
        $createForm = new UserCreateForm($this->di);

        $createForm->check();

        $data = [
            "content" => $createForm->getHTML(),
        ];

       return $this->di->get("render")->display("Skapa ny användare", "default1/article", $data);
    }



    /**
     * Rendering of update profile page.
     * @method updateProfile()
     * @return void
     */
    public function editAction()
    {
        $updateForm = new UserUpdateForm($this->di);

        $updateForm->check();

        $data = [
            "content" => $updateForm->getHTML(),
        ];

        return $this->di->get("render")->display("Uppdatera profil", "default1/article", $data);
    }



    /**
     * Rendering of profile page.
     * @method getProfilePage()
     * @return void
     */
    public function profileAction()
    {
        $this->checkLoggedIn();

        # Creating new user and set database.
        $user = new User();
        $user->setDb($this->di->get("dbqb"));

        # Get current session.
        $session = $this->di->get("session");

        $data = [
            "content" => $user->getUserInformationByEmail($session->get("email")),
        ];

        return $this->di->get("render")->display("Profile", "user/profile", $data);
    }



    /**
     * This function will handle logout.
     * @method logout()
     * @return mixed
     */
    public function logoutAction()
    {
        $session = $this->di->get("session");

        if ($session->has("email")) {
            $session->delete("email");
            $session->delete("items");
        }

        $url = $this->di->get("url")->create("user/login");
        return $this->di->get("response")->redirect($url);
    }



    /**
     * Check if user is logged in.
     * @method checkLoggedIn()
     * @return mixed
     */
    public function checkLoggedIn()
    {
        $url = $this->di->get("url");
        $response = $this->di->get("response");
        $session = $this->di->get("session");
        $login = $url->create("user/login");

        if ($session->has("email")) {
            return true;
        }

        $response->redirect($login);
        return false;
    }
}
