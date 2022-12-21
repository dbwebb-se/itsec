<?php

namespace Anax;

use PHPUnit\Framework\TestCase;
use \Anax\DI\DIFactoryConfig;
use \Course\Coupon\Coupon;

/**
 * Coupon test class.
 */
class CouponTest extends TestCase
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
     * Test that input below 0% discount does not work
     */
    public function testInvalidCouponBelow0()
    {
        // Expects an error thrown when the amount not is valid
        $this->expectException(Exception::class);

        // Create a coupon and connect
        $coupon = new Coupon();
        // Set the database object to use for accessing storage
        $coupon->setDb($this->dbqb);

        // Add data to the coupon (the same as the fields in the form)
        $coupon->setName("CouponInvalid");
        $coupon->setAmount(-10);
        $coupon->setStartDate("2021-03-17 00:00:00");
        $coupon->setFinishDate("2021-03-31 00:00:00");

        // Save in the database but an error will be thrown since the amount not is valid
        // Perhaps create a function in the Coupon class that checks the amount before
        // save is called. Or use validateCoupon.
        $res = $coupon->save();

        // Clean up test data from the database. Important to clean up or mock database calls
        // or use a test database.
        $coupon->deleteWhere("couponName LIKE ?", "CouponInvalid");
    }

    /**
     * Test that normal input works
     */
    public function testValidCoupon()
    {
        // Create a coupon and connect
        $coupon = new Coupon();
        // Set the database object to use for accessing storage
        $coupon->setDb($this->dbqb);

        // Add data to the coupon (the same as the fields in the form)
        $coupon->setName("CouponOk");
        $coupon->setAmount(20);
        $coupon->setStartDate("2021-03-17 00:00:00");
        $coupon->setFinishDate("2021-03-31 00:00:00");

        // Save in the database but an error will be thrown since the amount not is valid
        // Perhaps create a function in the Coupon class that checks the amount before
        // save is called. Or use validateCoupon.
        $res = $coupon->save();
    
        $this->assertTrue(true);
        // one assert or both 
        $getCoupon = $coupon->getCouponByName("CouponOk");
        $this->assertEquals("CouponOk", $getCoupon->couponName);

        //Cleaning up in database. Important to clean up or mock database calls
        // or use a test database.
        $coupon->deleteWhere("couponName LIKE ?", "CouponOk");

    }
}
