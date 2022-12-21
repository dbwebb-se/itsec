<?php

namespace Anax;

use PHPUnit\Framework\TestCase;
use Anax\DI\DIFactoryConfig;
use Course\Product\Product;

//define("ANAX_INSTALL_PATH", realpath(__DIR__ . "/../.."));

/**
 * Tests to prevent SQL Injection.
 */
class SearchTest extends TestCase
{
    private $di;
    private $dbqb;

    /**
     * Setup a DIFactoryConfig used for tests with the database.
     * 
     * DI factory class creating a set of default services by loading
     * them from a configuration array, file and/or directory.
     * Uses the services defines in /config/di
     * 
     * "dbqb" - build SQL queries by method calling.
     */
    public function setUp(): void
    {
        $this->di = new DIFactoryConfig();
        $this->di->loadServices(ANAX_INSTALL_PATH . "/config/di");

        $this->dbqb = $this->di->get("dbqb");
    }
    
    /**
     * Test that the search string "En fin tröja" results in a result array
     * as tested in the eshop.
     */
    public function testSearchExistingItem()
    {
        $product = new Product;
        $product->setDb($this->dbqb);

        $res = $product->searchProducts("En fin tröja");

        $this->assertNotEmpty($res);
        $this->assertEquals("En fin tröja", $res[0]->productName);
    }

    /**
     * Test that the search string "jultomte" results in an empty result array
     * as tested in the eshop.
     */
    public function testSearchNotExistingItem()
    {
        $product = new Product;
        $product->setDb($this->dbqb);

        $res = $product->searchProducts("jultomte");

        $this->assertEmpty($res);
    }
}
