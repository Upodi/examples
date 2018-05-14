<?php

/**
 * Class for upodi request in php use.
 */
class UpodiRequest {

    //Api key for public use in all class.
    public $apiKey;
    
    /**
     * Constructor for the class
     * @param key The api key.
     */
    function __construct($key) {
        $this->apiKey = $key;
    }

    /**
     * This function is used to request an address with data and type of method, the return is the server response.
     * @param method 'GET', 'SET', 'POST', 'PUT' or 'DELETE' in string format.
     * @param address The url of the address to request.
     * @param data Optional data to be send with the request.
     */
    function request($method, $address, $data = NULL, $alternativeContentType = false) {
        //Init curl request.
        $req = curl_init($address);

        //Check if data is not defined or not able to be encdoded into json.
        if($data == NULL) {
            $data = json_encode(false);
        } else {
            $data = json_encode($data);
        }

        if(!$alternativeContentType) {
            $contentType = 'application/json; charset=utf-8';
        } else {
            $contentType = $alternativeContentType;
        }
        
        //Setup options headers data etc.
        $options = array(
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array(
                'Authorization:bearer ' . base64_encode($this->apiKey),
                'Accept:application/json; charset=utf-8',
                'Content-Type:' . $contentType
            ),
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_RETURNTRANSFER => true,
        );
        curl_setopt_array($req, $options);

        //Execute curl command and close it.
        $content = curl_exec($req);
        //Check if there is http error.
        if(curl_errno($req) != 0) {
            throw new Exception(curl_error($req));
        }
        curl_close($req);

        //Try to decode result content.
        $result = json_decode($content, true);
        //Throw error if it is not in json format.
        if($result === NULL) {
            if($content != false) {
                throw new Exception($content);
            } else {
                $result = true;
            }
        }

        //Check if there is an error message from server and throw in case there is.
        if(gettype($result) == 'array') {
            if(array_key_exists('Message', $result)) {
                throw new Exception($result['Message']);
            }
        }

        //Return result.
        return $result;
    }

    //-------------------------------------------------------------- Customer functions -----------------------------------------------\\

    /**
     * Get all customers.
     * @return result This method returns the result in array/json format to php.
     */
    function getAllCustomers() {
        return $this->request('GET', 'https://api.upodi.io/v2/customers');
    }

    /**
     * Create a customer.
     * @param customer The customer to be created, minimum requirements are fullname.
     * @return result This method returns the ID of the newly created customer.
     */
    function createCustomer($customer) {
        return $this->request('POST', 'https://api.upodi.io/v2/customers', $customer);
    }

    /**
     * Update customer.
     * @param customer The customer to be updated and the new data of the customer to update it to, use the ID to select the customer and the rest of the object will update the customer.
     * @return result This method returns true if nothing goes wrong.
     */
    function updateCustomer($customer) {
        return $this->request('PUT', 'https://api.upodi.io/v2/customers', $customer);
    }

    /**
     * Get customer by specific ID.
     * @param ID The id of the customer to search for.
     * @return result This returns the customer obj of the customer searched for.
     */
    function getCustomerByID($ID) {
        if(trim($ID) == "") {
            throw new Exception("ID has to be a non empty string");
        } else {
            return $this->request('GET', 'https://api.upodi.io/v2/customers/'.$ID);      
        }
    }

    /**
     * Delete a customer with a specific ID.
     * @param ID The id of the customer to delete.
     * @return result Returns true if deletion is successfull.
     */
    function deleteCustomer($ID) {
        return $this->request('DELETE', 'https://api.upodi.io/v2/customers/'.$ID);
    }

    /**
     * Get payment methods of customer
     * @param ID The id of the customer to get payment methods of.
     * @return result Returns an array with all payment methods. Returns true if there is no payment methods, to indicate that request was successfull.
     */
    function getPaymentMethodOfCustomer($ID) {
        return $this->request('GET','https://api.upodi.io/v2/customers/' . $ID . '/paymentmethods/');
    }

    /**
     * Get all invoices of a specific customer.
     * @param ID The id of the customer to get all invoices of.
     * @return result Returns an array of invoice objects of the specific customer. Returns error if customer has no invoices.
     */
    function getInvoicesOfCustomer($ID) {
        return $this->request('GET','https://api.upodi.io/v2/customers/' . $ID . '/invoice');
    }

    /**
     * Get customer by Account Number
     * @param accNumber The account Number to search for.
     * @return result Returns a single customer object if it exists.
     */
    function getCustomerByAccountNumber($accNumber) {
        return $this->request('GET','https://api.upodi.io/v2/customers/' . $accNumber . '/accountnumber/');
    }

    /**
     * Validate a payment method.
     * @param ID The id of the payment method.
     * @return result Returns true if the payment is validated.
     */
    function validatePaymentMethodByID($ID) {
        return $this->request('GET','https://api.upodi.io/v2/customers/' . $ID . '/validatepaymentmethod/');
    }

    /**
     * Assign a card token to a specific customer.
     * @param ID The id of the customer.
     * @param cardToken The cardtoken to be applied to the customer.
     * @param makedefault Wether or not to make the payment method default.
     */
    function assignCardTokenToCustomer($ID, $cardtoken, $makedefault) {
        $data = array(
            'token' => $cardtoken,
            'makeDefault' => $makedefault
        );
        return $this->request('PUT', 'https://api.upodi.io/v2/customers/' . $ID . '/assigncardtoken/', $data);
    }

    /**
     * Set a payment method to be default payment to a specific customer.
     * @param ID The id of the customer to set the payment method to.
     * @param paymentMethodID The id of the payment method to set to default on the customer.
     * @return result Returns true if it is set to default.
     */
    function setDefaultPaymentMethod($ID, $paymentMethodID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/customers/'. $ID . '/setdefaultpaymentmethod/', $paymentMethodID);
    }

    //-------------------------------------------------------------- Discount methods -----------------------------------------------\\

    /**
     * Get all discounts
     * @return result This method returns all discount codes as discount objects.
     */
    function getAllDiscounts() {
        return $this->request('GET', 'https://api.upodi.io/v2/discounts');
    }

    /**
     * Get discount by discount ID
     * @param ID The ID of the discount code to get.
     * @return result The discount code with the spcecific ID.
     */
    function getDiscountByID($ID) {
        if(trim($ID) == "") {
            throw new Exception("ID has to be a non empty string.");
        } else {
            return $this->request('GET', 'https://api.upodi.io/v2/discounts/' . $ID);
        }
    }

    /**
     * Add discount code to a specific customer.
     * @param ID The ID of the customer to add the discount code to.
     * @param discountCode The discount code to add to the customer, this is in the format of {prefix}-{code}.
     * @return result True if the discount has been applied.
     */
    function applyDiscountToCustomer($ID, $discountCode) {
        return $this->request('PUT', 'https://api.upodi.io/v2/discounts/' . $ID . '/applydiscountcodecustomer', $discountCode);
    }

    /**
     * Add discount code to a specific subscription.
     * @param ID The ID of the subscription to add the discount to.
     * @param discountCode The discount code to add to the subscription, this is in the format of {prefix}-{code}.
     * @return result True if the discount has been applied.
     */
    function applyDiscountToSubscription($ID, $discountCode) {
        return $this->request('PUT', 'https://api.upodi.io/v2/discounts/' . $ID . '/applydiscountcodesubscription', $discountCode);
    }

    /**
     * Add discount code to a speicific subscriptioncharge.
     * @param ID The ID of the subscriptioncharge to add the discount to.
     * @param discountCdoe The discount code to add to the subscriptioncharge, this is in format of {prefix}-{code}.
     * @return result True if the discount has been applied.
     */
    function applyDiscountToSubscriptionCharge($ID, $discountCode) {
        return $this->request('PUT', 'https://api.upodi.io/v2/discounts/' . $ID . '/applydiscountcodesubscriptioncharge', $discountCode);
    }

    /**
     * Clear all discounts of a specific customer.
     * @param ID The ID of the customer to clear.
     * @return result True if the customer is cleared.
     */
    function clearDiscountFromCustomer($ID) {
        return $this->request('DELETE', 'https://api.upodi.io/v2/discounts/' . $ID . '/cleardiscountcodecustomer');
    }

    /**
     * Clear discounts of a specific subscription.
     * @param ID The ID of the subscription to clear.
     * @return result True if the subscription is cleared.
     */
    function clearDiscountFromSubscription($ID) {
        return $this->request('DELETE', 'https://api.upodi.io/v2/discounts/' . $ID . '/cleardiscountcodesubscription');
    }

    //-------------------------------------------------------------- Payment method methods -----------------------------------------------\\

    /**
     * Get all paymentmethods.
     * @return result A list of all payment methods.
     */
    function getAllPaymentMethods() {
        return $this->request('GET', 'https://api.upodi.io/v2/paymentmethods/');
    }

    /**
     * Get a payment method with a specific ID.
     * @param ID The ID of the specific payment method.
     * @return result The payment method with the specific ID, or nothing if nothing is acquired.
     */
    function getPaymentMethodByID($ID) {
        if(trim($ID) == "") {
            throw new Exception("ID has to be a non empty string.");
        } else {
            return $this->request('GET', 'https://api.upodi.io/v2/paymentmethods/' . $ID);
        }
    }

    /**
     * Add payment method to a customer.
     * @param ID The ID of the customer to add payment method to.
     * @param paymentMethodObj The obj of payment method check documentation for a better description of how the object is structured. https://docs.upodi.com/v1.0/reference#paymentmethod-object
     * @return result True if the payment method is added.
     */
    function addPaymentMethodToCustomer($ID, $paymentMethodObj) {
        return $this->request('POST', 'https://api.upodi.io/v2/paymentmethods/' . $ID, $paymentMethodID);
    }

    //-------------------------------------------------------------- Subscription methods -----------------------------------------------\\

    /**
     * Get all subscriptions.
     * @return result A list of all subscription objects.
     */
    function getAllSubscriptions() {
        return $this->request('GET', 'https://api.upodi.io/v2/subscriptions');
    }

    /**
     * Create a new subscription.
     * @param subscriptionObj A subscription object. Check the documentation for specification. https://docs.upodi.com/v1.0/reference#subscription-object
     * @return result True if the subscription is created.
     */
    function createSubscription($subscriptionObj) {
        return $this->request('POST', 'https://api.upodi.io/v2/subscriptions', $subscriptionObj);
    }

    /**
     * Get a specific subscription by ID.
     * @param ID The subscription ID.
     * @return result The subscription that is queried for.
     */
    function getSubscriptionByID($ID) {
        if(trim($ID) == "") {
            throw new Exception("ID has to be a non empty string");
        } else {
            return $this->request('GET', 'https://api.upodi.io/v2/subscriptions/' . $ID);
        }
    }

    /**
     * Activate a specific subscription.
     * @param ID The ID of the subscription to be activated.
     * @return result True if the subscription is activated successfully.
     */
    function activateSubscription($ID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/subscriptions/' . $ID . '/activate/');
    }

    /**
     * Switch a subscription to another plan.
     * @param subscriptionID The ID of the subscription to switch plan of.
     * @param planID The plan ID to switch the subscription to.
     * @return result True if the subscriptionplan is switched.
     */
    function switchSubscriptionPlan($subscriptionID, $planID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/subscriptions/' . $ID . '/switchplan/', $planID);
    }

    /**
     * Cancel a specific subscription.
     * @param ID The ID of the subscription to be canceled.
     * @return result True if the subscription is canceled successfully.
     */
    function cancelSubscription($ID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/subscriptions/' . $ID . '/cancel/');
    }

    /**
     * Resume a specific subscription.
     * @param ID The ID of the subscription to be resumed.
     * @return result True if the subscription is canceled successfully.
     */
    function resumeSubscription($ID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/subscriptions/' . $ID . '/resume/');
    }

    /**
     * Hold a specific subscription.
     * @param ID The ID of the subscription to be held.
     * @return result True if the subscription is held successfully.
     */
    function holdSubscription($ID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/subscriptions/' . $ID . '/hold/');
    }

    /**
     * Expire a specific subscription.
     * @param ID The ID of the subscription to be expired.
     * @return result True if the subscription is exipred successfully.
     */
    function expireSubscription($ID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/subscriptions/' . $ID . '/expire/');
    }

    //-------------------------------------------------------------- Subscriptioncharge methods -----------------------------------------------\\

    /**
     * Get all subscription charges.
     * @return result A list of all subscription charges.
     */
    function getAllSubscriptionCharges() {
        return $this->request('GET', 'https://api.upodi.io/v2/subscriptionCharges');
    }

    /**
     * Get a subscriptioncharge by ID.
     * @param ID The ID of the subscriptioncharge.
     * @return result The subscriptioncharge object that has the queried ID.
     */
    function getSubscriptionChargeByID($ID) {
        if(trim($ID) == "") {
            throw new Exception("ID has to be a non empty string");
        } else {
            return $this->request('GET', 'https://api.upodi.io/v2/subscriptionCharges/' . $ID);
        }
    }

    /**
     * Set amount of a specific subscriptioncharge.
     * @param ID The ID of the specifici subscriptioncharge.
     * @param amount The amount to set the charge to.
     * @return result True if the subscriptioncharge is set to the new amount.
     */
    function setAmountOfSubscriptionCharge($ID, $amount) {
        return $this->request('PUT', 'https://api.upodi.io/v2/subscriptionCharges/' . $ID . '/setamount/', $amount);
    }

    /**
     * Hold a specific subscriptioncharge.
     * @param ID The ID of the subscriptioncharge to be held.
     * @return result True if the subscription charge is held successfully.
     */
    function holdSubscriptionCharge($ID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/subscriptionCharges/' . $ID .'/hold/');
    }

    //-------------------------------------------------------------- Time method -----------------------------------------------\\

    /**
     * Get the server time.
     * @return result The server time.
     */
    function getServerTime() {
        return $this->request('GET', 'https://api.upodi.io/v2/time');
    }

    //-------------------------------------------------------------- Invoice methods -----------------------------------------------\\

    /**
     * Get all invoices
     * @return result A list of all invoices.
     */
    function getAllInvoices() {
        return $this->request('GET', 'https://api.upodi.io/v2/invoices');
    }

    /**
     * Get invoice by ID
     * @param ID The ID of the invoice to query for.
     * @return result The invoice with the id queried for.
     */
    function getInvoiceByID($ID) {
        if(trim($ID) == "") {
            throw new Exception("ID has to be a non empty string");
        } else {
            return $this->request('GET', 'https://api.upodi.io/v2/invoices' . $ID);
        }
    }

    /** 
     * Get PDF with invoice id.
     * @param ID The ID of the invoice to get the pdf of.
     * @return result The pdf of the invoice.
     */
    function getPDFWithID($ID) {
        return $this->request('https://api.upodi.io/v2/invoices/'. $ID . '/getpdfwithid', NULL, 'application/pdf');
    }

    /** 
     * Get PDF with invoice number.
     * @param invoiceNumber The invoice number of the invoice to get pdf of.
     * @return result The pdf of the invoice.
     */ 
    function getPDFWithInvoiceNumber($invoiceNumber) {
        return $this->request('https://api.upodi.io/v2/invoices/'. $invoiceNumber . '/getpdfwithinvoicenumber', NULL, 'application/pdf');
    }

    /**
     * Get invoice by invoice number.
     * @param invoiceNumber The invoice number of the invoice.
     * @return result The invoice with the queried invoice number.
     */
    function getInvoiceByInvoiceNumber($invoiceNumber) {
        return $this->request('GET', 'https://api.upodi.io/v2/invoices/' . $invoiceNumber . '/number/');
    }

    /**
     * Mark a specific invoice as paid.
     * @param ID The ID of the invoice to mark as paid.
     * @return result True if the invoice has been marked as paid successfully.
     */
    function markInvoiceAsPaid($ID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/invoices/' . $ID . '/markpaid/');
    }

    /**
     * Cancel a specific invoice.
     * @param ID The ID of the invoice to cancel.
     * @return result True if the invoice has been canceled successfully.
     */
    function cancelInvoice($ID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/invoices/' . $ID . '/markpaid/');
    }

    /**
     * Recharge a specific invoice.
     * @param ID The ID of the invoice to be recharged.
     * @param result True if the invoice has been recharge successfully.
     */
    function rechargeInvoice($ID) {
        return $this->request('PUT', 'https://api.upodi.io/v2/invoices/' . $ID . '/recharge/');
    }

    //-------------------------------------------------------------- Productplan methods -----------------------------------------------\\

    /**
     * Get all productplans.
     * @return result A list of all productplan objects.
     */
    function getAllProductPlans() {
        return $this->request('GET', 'https://api.upodi.io/v2/productplans');
    }

    /**
     * Get a specific productplan by ID.
     * @param ID The ID of the productplan.
     * @return result The productplan object of the queried ID.
     */
    function getProductPlanByID($ID) {
        if(trim($ID) == "") {
            throw new Exception("ID has to be a non empty string.");
        } else {
           return $this->request('GET', 'https://api.upodi.io/v2/productplans');
        }
    }

    /**
     * Duplicate a specific productplan.
     * @param ID The ID of the productplan to duplicate.
     * @return result True if the productplan is duplicated successfully.
     */
    function duplicateProductPlan($ID) {
        return $this->request('POST', 'https://api.upodi.io/v2/productplans/' . $ID . '/duplicate');
    }

    //-------------------------------------------------------------- Tranaction methods -----------------------------------------------\\

    /**
     * Get all transactions
     * @return result A list of all transaction objects.
     */
    function getAllTransactions() {
        return $this->request('GET', 'https://api.upodi.io/v2/transactions');
    }   
    
    /**
     * Get a specific transaction by ID.
     * @param ID The ID of the transaction.
     * @return result The transaction queried for.
     */
    function getTransactionsByID($ID) {
        if(trim($ID) == "") {
            throw new Exception("ID has to be a non empty string");
        } else {
            return $this->request('GET', 'https://api.upodi.io/v2/transactions' . $ID);
        }
    }
}

?>