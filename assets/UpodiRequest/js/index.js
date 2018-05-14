"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var XMLHttpRequest = (require('xmlhttprequest').XMLHttpRequest);
//var btoa = require("btoa");
//var emptyFunc = function () { };


var UpodiRequest = (function () {
    /** @class UpodiRequest */
    function UpodiRequest(key) {
        this.key = key;
        this.apiKey = key;
    }
    /**
     * Request a certain address with the apikey with a specific callback
     * @method request
     * @memberOf UpodiRequest
     * @param HTTPMethod "GET", "POST" or "PUT" call.
     * @param address The address to call
     * @param callBack The callback to run once data returns
     * @param data The data to send if the call is POST or PUT
     */
    UpodiRequest.prototype.request = function (HTTPMethod, address, callBack, data, alternativeApplicationType) {
        if (data === void 0) { data = null; }
        if (alternativeApplicationType === void 0) { alternativeApplicationType = null; }
        if (data == null || data == undefined) {
            var stringData = JSON.stringify(false);
        }
        else {
            var stringData = JSON.stringify(data);
        }
        var xhr = new XMLHttpRequest();
        //Adds an eventlistener when the callback is coming back
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState == this.DONE) {
                //Calling the callback function
                var result;
                try {
                    result = JSON.parse(this.responseText);
                }
                catch (e) {
                    result = this.responseText;
                }
                if (result.Message != undefined) {
                    throw new Error(result.Message);
                }
                else {
                    callBack(result);
                }
            }
        });
        //Open the request
        xhr.open(HTTPMethod, address);
        //Check if api-key is undefined.
        if (this.apiKey != undefined) {
            //Set the headers
            if (alternativeApplicationType != null) {
                xhr.setRequestHeader('Accept', alternativeApplicationType);
            }
            else {
                xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
            }
            xhr.setRequestHeader('Authorization', "bearer " + btoa(this.apiKey));
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            //Send the request
            xhr.send(stringData);
        }
        else {
            //Error log if api key is invalid
            throw new Error("Api key is either undefined or not a string");
        }
    };
    //----------------------------------------------------------------------- Customer Methods ------------------------------------------------------------\\
    /**
     * Method to get all customers from the Upodi Server
     * @method getAllCustomers
     * @memberOf UpodiRequest
     * @param callBack Optional callback to run once the customers has been returned.
    */
    UpodiRequest.prototype.getAllCustomers = function (callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/customers", callBack);
    };
    /**
     * Method to get a customer by AccountNumber.
     * @method getCustomerByAccountNumber
     * @memberOf UpodiRequest
     * @param accountNumber The accountNumber you want to search for
     * @param callBack Optional callback to run with the customer returned.
    */
    UpodiRequest.prototype.getCustomerByAccountNumber = function (accountNumber, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/customers/" + accountNumber + "/accountnumber/", callBack);
    };
    /**
     * Method to get a customer by the GUID used by upodi backend
     * @method getCustomerByID
     * @memberOf UpodiRequest
     * @param ID The id to look for.
     * @param callBack Optional callback to run with the customers as parameter.
    */
    UpodiRequest.prototype.getCustomerByID = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/customers/" + ID, callBack);
        }
    };
    /**
     * Update customers data
     * @method updateCustomer
     * @memberOf UpodiRequest
     * @param data The data of the customer to update
     * @param callBack Optional callback to run once the customer has been updated.
     */
    UpodiRequest.prototype.updateCustomer = function (data, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("PUT", "https://api.upodi.io/v2/customers", callBack, data);
    };
    /**
     * Method to create a customer through the API.
     * @method createCustomer
     * @memberOf UpodiRequest
     * @param data Minimum requirement for data to create a customer is "fullname" check https://docs.upodi.com/reference#customer-object for reference to customer object.
     * @param callBack Optional callback to run once the customers has been created.
    */
    UpodiRequest.prototype.createCustomer = function (data, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("POST", "https://api.upodi.io/v2/customers/", callBack, data);
    };
    /**
     * Method to delete customer by ID
     * @method deleteCustomer
     * @memberOf UpodiRequest
     * @param ID The ID to delete.
     * @param callBack Optional callaback to run once the customer has been deleted.
    */
    UpodiRequest.prototype.deleteCustomer = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("DELETE", "https://api.upodi.io/v2/customers/" + ID, callBack);
    };
    /**
     * Return a list of payment method ids. Requires API scope 'read'.
     * @method getCustomerpaymentMethods
     * @memberOf UpodiRequest
     * @param ID The id of the customer.
     * @param callBack Optional callback to run with the result of the query.
     */
    UpodiRequest.prototype.getCustomerpaymentMethods = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/customers/" + ID + "/paymentmethods/", callBack);
    };
    /**
     * Get a customers invoices
     * @method getCustomerInvoices
     * @memberOf UpodiRequest
     * @param ID The ID for the customer to get invoices of.
     * @param callBack Optional callback to run once the result is in.
     */
    UpodiRequest.prototype.getCustomerInvoices = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/customers/" + ID + "/invoices", callBack);
        }
    };
    /**
     * Validate a customer by a payment method ID
     * @method validatePaymentMethodByID
     * @memberOf UpodiRequest
     * @param ID The id of the payment method
     * @param callBack Optional callback to run once the validation is complete.
     */
    UpodiRequest.prototype.validatePaymentMethodByID = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/customers/" + ID + "/validatepaymentmethod/", callBack);
        }
    };
    /**
     * Assign a cardtoken to a customer by ID.
     * @method assignCardTokenToCustomer
     * @memberOf UpodiRequest
     * @param ID The ID to assign the cardToken to.
     * @param token The cardToken to assign.
     * @param makeDefault Decide wether or not to make the card default or not
     * @param callBack Optional callback in case you want to run something after card token has been assigned.
    */
    UpodiRequest.prototype.assignCardTokenToCustomer = function (ID, token, makeDefault, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        var data = {
            "token": token,
            "makedefault": makeDefault
        };
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/customers/" + ID + "/assigncardtoken/", callBack, data);
        }
    };
    /**
     * Set a specific payment method to default for a specific customer by ID.
     * @method setDefaultPaymentOfCustomer
     * @memberOf UpodiRequest
     * @param ID The ID of the customer to set the payment method.
     * @param PMethodID The ID of the payment method.
     * @param callBack Optional callback to run once the payment method has been set.
     */
    UpodiRequest.prototype.setDefaultPaymentOfCustomer = function (ID, PMethodID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("PUT", "https://api.upodi.io/v2/customers/" + ID + "/setdefaultpaymentmethod/", callBack, PMethodID);
    };
    //----------------------------------------------------------------------- Discount ------------------------------------------------------------\\
    /**
     * Get all discounts
     * @method getAllDiscounts
     * @memberOf UpodiRequest
     * @param callBack Optional callback to run once all discount has been collected.
    */
    UpodiRequest.prototype.getAllDiscounts = function (callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/discounts", callBack);
    };
    /**
     * Get discount by ID
     * @method getDiscountByID
     * @memberOf UpodiRequest
     * @param ID The ID of the discount to search for.
     * @param callBack Optional callback to run once a discount has been collected.
    */
    UpodiRequest.prototype.getDiscountByID = function (ID, callBack) {
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/discounts/" + ID, callBack);
        }
    };
    /**
     * Apply discount code to customer.
     * @method applyDiscountToCustomer
     * @memberOf UpodiRequest
     * @param ID The customer ID to apply the code to.
     * @param discountCode The discountCode.
     * @param callBack Optional callback method to call after the discount code has been applied.
    */
    UpodiRequest.prototype.applyDiscountToCustomer = function (ID, discountCode, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/discounts/" + ID + "/applydiscountcodecustomer", callBack, discountCode);
        }
    };
    /**
     * Apply discount to a specific subscription.
     * @method applyDiscountToSubscription
     * @memberOf UpodiRequest
     * @param ID The id of the subscription.
     * @param discountCode The discount code.
     * @param callBack Optional callback to run once the discount has been applied.
     */
    UpodiRequest.prototype.applyDiscountToSubscription = function (ID, discountCode, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/discounts/" + ID + "/applydiscountcodesubscription", callBack, discountCode);
        }
    };
    /**
     * Apply discount to a specific subscriptioncharge
     * @method applyDiscountToSubscriptionCharge
     * @memberOf UpodiRequest
     * @param ID The id of the subscriptioncharge
     * @param discountCode The discoutncode
     * @param callBack Optional callback to run once the discount has been applied.
     */
    UpodiRequest.prototype.applyDiscountToSubscriptionCharge = function (ID, discountCode, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/discounts/" + ID + "/applydiscountcodesubscriptioncharge", callBack, discountCode);
        }
    };
    /**
     * Clear discount from a customer.
     * @method clearDiscountFromCustomer
     * @memberOf UpodiRequest
     * @param ID The id of the customer.
     * @param callBack Optional callback to run once the discount has been cleared.
     */
    UpodiRequest.prototype.clearDiscountFromCustomer = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("DELETE", "https://api.upodi.io/v2/discounts/" + ID + "/cleardiscountcodecustomer", callBack);
        }
    };
    /**
     * Clear discount from a subscription
     * @method clearDiscountFromSubscription
     * @memberOf UpodiRequest
     * @param ID The id of the subscription
     * @param callBack Optional callback to run once the discount has been cleared.
     */
    UpodiRequest.prototype.clearDiscountFromSubscription = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("DELETE", "https://api.upodi.io/v2/discounts/" + ID + "/cleardiscountcodesubscription", callBack);
        }
    };
    //----------------------------------------------------------------------- Payment methods ------------------------------------------------------------\\
    /**
     * Get all payment methods created.
     * @method getAllPaymentMethods
     * @memberOf UpodiRequest
     * @param callBack Optional function to run once the paymenth methods has been returned.
     */
    UpodiRequest.prototype.getAllPaymentMethods = function (callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/paymentmethods/", callBack);
    };
    /**
     * Get payment methods by payment method ID.
     * @method getPaymentMethodByID
     * @memberOf UpodiRequest
     * @param ID The ID of the payment method.
     * @param callBack Optional callback to run once the payment method has been returned.
     */
    UpodiRequest.prototype.getPaymentMethodByID = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/paymentmethods/" + ID, callBack);
        }
    };
    /**
     * Get payment method by customer id.
     * @method getPaymentMethodsByCustomerID
     * @memberOf UpodiRequest
     * @param ID The customer ID.
     * @param callBack Optioncal callback to run once the payment method has been returned.
     */
    UpodiRequest.prototype.getPaymentMethodsByCustomerID = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/paymentmethods/" + ID + "/btcustomer/", callBack);
        }
    };
    /**
     * Add a payment method to a customer by ID.
     * @method addPaymentMethodToCustomer
     * @memberOf UpodiRequest
     * @param paymentMethodObject The payment method object to be assigned to the given customer. See more about this object at https://docs.upodi.com/v1.0/reference#createpaymentmethod-object
     * @param ID The customer ID.
     * @param callBack Optional callback to run once the payment method has been added.
     */
    UpodiRequest.prototype.addPaymentMethodToCustomer = function (paymentMethodObject, ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("POST", "https://api.upodi.io/v2/paymentmethods/" + ID, callBack, paymentMethodObject);
        }
    };
    //----------------------------------------------------------------------- Subscription ------------------------------------------------------------\\
    /**
     * Get all subscriptions
     * @method getAllSubscriptions
     * @memberOf UpodiRequest
     * @param callBack Optional function to be run one the data returns.
    */
    UpodiRequest.prototype.getAllSubscriptions = function (callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/subscriptions", callBack);
    };
    /**
     * Get subscription by subscriptionID
     * @method getSubscriptionByID
     * @memberOf UpodiRequest
     * @param ID The subscriptionID to search for
     * @param callBack Optional method to run once the data returns.
    */
    UpodiRequest.prototype.getSubscriptionByID = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/subscriptions/" + ID, callBack);
        }
    };
    /**
     * Create a new subscriptions
     * @method createSubscription
     * @memberOf UpodiRequest
     * @param subscriptionObject The object to be posted to create a new subscription. See module link for more info of what it contains https://docs.upodi.com/v1.0/reference#subscription-object
     * @param callBack Optional method to be run once the subscription has been created the retun of the request will return the newly created subscription ID.
    */
    UpodiRequest.prototype.createSubscription = function (subscriptionObject, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("POST", "https://api.upodi.io/v2/subscriptions", callBack, subscriptionObject);
    };
    /**
     * Activate a draft or hold subscription with a subscription ID
     * @method activateSubscription
     * @memberOf UpodiRequest
     * @param ID The ID of the subscription to be activated.
     * @param callBack Optional callback function to be run after the subscription has been activated
    */
    UpodiRequest.prototype.activateSubscription = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + ID + "/activate/", callBack);
        }
    };
    /**
     * Function used to resume a hold subscription.
     * @method resumeSubscription
     * @memberOf UpodiRequest
     * @param ID The id of the subscription to be activated.
     * @param callBack Optional function to be called once the subscription is activated.
    */
    UpodiRequest.prototype.resumeSubscription = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + ID + "/resume/", callBack);
        }
    };
    /**
     * Switch a plan of a subscription from one to another
     * @method switchSubscriptionPlan
     * @memberOf UpodiRequest
     * @param subscriptionID The ID of the subscription to be switched
     * @param planID The plan ID to switch the subscription to.
     * @param callBack Optional callback function to be run after the subscription plans has switched.
    */
    UpodiRequest.prototype.switchSubscriptionPlan = function (subscriptionID, planID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (subscriptionID == "" || planID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + subscriptionID + "/switchplan/", callBack, planID);
        }
    };
    /**
     * Cancel an active subscription subscription with a subscription ID
     * @method cancelSubscription
     * @memberOf UpodiRequest
     * @param ID The id of the subscription to cancel
     * @param callBack Optional callback function to be run after the subscription has been canceled.
    */
    UpodiRequest.prototype.cancelSubscription = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + ID + "/cancel/", callBack);
        }
    };
    /**
     * Hold an active subscription from a subscriptionID
     * @method holdSubscription
     * @memberOf UpodiRequest
     * @param ID The ID of the subscription to hold
     * @param callBack Optional callback function to be run after the subscription has been put on hold.
    */
    UpodiRequest.prototype.holdSubscription = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + ID + "/hold/", callBack);
        }
    };
    /**
     * Expire an active or hold subscription
     * @method expireSubscription
     * @memberOf UpodiRequest
     * @param ID The ID of the subscription to be expired
     * @param callBack Optional callback function to be run after the subscription has been set to expire
    */
    UpodiRequest.prototype.expireSubscription = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + ID + "/expire/", callBack);
        }
    };
    //----------------------------------------------------------------------- Subscription Charges ------------------------------------------------------------\\
    /**
     * Get all subscriptioncharges.
     * @method getAllSubscriptionCharges
     * @memberOf UpodiRequest
     * @param callBack Optional callback to run once all subscription charges are returned.
    */
    UpodiRequest.prototype.getAllSubscriptionCharges = function (callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/subscriptionCharges", callBack);
    };
    /**
     * Get Subscriptioncharge by ID.
     * @method getSubscriptionChargeByID
     * @memberOf UpodiRequest
     * @param ID The ID of the subscriptioncharge to search for.
     * @param callBack Optional callBack method to be run once the request returns.
    */
    UpodiRequest.prototype.getSubscriptionChargeByID = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/subscriptionCharges/" + ID, callBack);
        }
    };
    /**
     * Set amount of specific subscriptioncharge
     * @method setAmountByID
     * @memberOf UpodiRequest
     * @param ID The ID of the subscription charge to set amount for.
     * @param amount The amount to set charge to.
     * @param callBack Optional method to be run once the amount has been set.
    */
    UpodiRequest.prototype.setAmountByID = function (ID, amount, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID = "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/subscriptionCharges/" + ID + "/setamount/", callBack, amount);
        }
    };
    /**
     * Hold specific subscriptioncharge.
     * @method holdSubscriptionCharge
     * @memberOf UpodiRequest
     * @param ID The ID of the subscriptioncharge to be put on hold.
     * @param callBack Optional callback method to be run once the charge has been set on hold.
    */
    UpodiRequest.prototype.holdSubscriptionCharge = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/subscriptionCharges/" + ID + "/hold/", callBack);
        }
    };
    //----------------------------------------------------------------------- Time ------------------------------------------------------------\\
    /**
     * Get current server time.
     * @method getServerTime
     * @memberOf UpodiRequest
     * @param callBack Optional callback to run with the server time when returned.
     */
    UpodiRequest.prototype.getServerTime = function (callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/time", callBack);
    };
    //----------------------------------------------------------------------- Invoices ------------------------------------------------------------\\
    /**
     * Get all invoices.
     * @method getAllInvoices
     * @memberOf UpodiRequest
     * @param callBack Optional function to be run once the request returns.
    */
    UpodiRequest.prototype.getAllInvoices = function (callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/invoices", callBack);
    };
    /**
     * Get one invoice by the invoiceID.
     * @method getInvoiceByID
     * @memberOf UpodiRequest
     * @param ID The ID of the invoice to be recieved.
     * @param callBack Optional function to be run once the request returns.
    */
    UpodiRequest.prototype.getInvoiceByID = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/invoices/" + ID, callBack);
        }
    };
    /**
     * Get pdf of invoice by ID.
     * @method getInvoicePDFByID
     * @memberOf UpodiRequest
     * @param ID The id of the invoice.
     * @param callBack Optional callback to run with the pdf when it is returned. This is in 'application/pdf' format.
     */
    UpodiRequest.prototype.getInvoicePDFByID = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/invoices/" + ID + "/getpdfwithid", callBack, null, "application/pdf");
        }
    };
    /**
     * Get pdf of invoice by invoice number
     * @method getInvoicePDFByInvoiceNumber
     * @memberOf UpodiRequest
     * @param invoiceNumber The invoice number of the invoice.
     * @param callBack Optioncal callback to run with the pdf when ti is returned. this is in 'application/pdf' format.
     */
    UpodiRequest.prototype.getInvoicePDFByInvoiceNumber = function (invoiceNumber, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (invoiceNumber == "") {
            throw new Error("invoiceNumber has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/invoices/" + invoiceNumber + "/getpdfwithinvoicenumber", callBack, null, "application/pdf");
        }
    };
    /**
     * Get one invoice from the invoiceNumber.
     * @method getInvoiceByInvoiceNumber
     * @memberOf UpodiRequest
     * @param invoiceNumber The invoicenumber of the invoice to be recieved.
     * @param callBack Optional function to be run once the request returns.
    */
    UpodiRequest.prototype.getInvoiceByInvoiceNumber = function (invoiceNumber, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (invoiceNumber == "") {
            throw new Error("invoiceNumber has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/invoices/" + invoiceNumber + "/number/", callBack);
        }
    };
    /**
     * Mark an invoice as paid.
     * @method markInvoicePaid
     * @memberOf UpodiRequest
     * @param ID The ID of the invoice to be marked as paid.
     * @param callBack Optional function to be run once the invoice is marked as paid.
    */
    UpodiRequest.prototype.markInvoicePaid = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/invoices/" + ID + "/markpaid/", callBack);
        }
    };
    /**
     * Mark an invoice as canceled.
     * @method markInvoiceCanceled
     * @memberOf UpodiRequest
     * @param ID The ID of the invoice to marked canceled.
     * @param callBack Optional function to be run once the invoice is marked as canceled.
    */
    UpodiRequest.prototype.markInvoiceCanceled = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/invoices/" + ID + "/cancel/", callBack);
        }
    };
    /**
     * Recharge an failed payment of an invoice.
     * @method rechargeFailedPayment
     * @memberOf UpodiRequest
     * @param ID The ID of the invoice to be recharged.
     * @param callBack Optional function to be run once the invoice is marked as canceled.
    */
    UpodiRequest.prototype.rechargeFailedPayment = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("PUT", "https://api.upodi.io/v2/invoices/" + ID + "/recharge/", callBack);
        }
    };
    //----------------------------------------------------------------------- Productplan ------------------------------------------------------------\\
    /**
     * Get all productplans.
     * @method getAllProductPlans
     * @memberOf UpodiRequest
     * @param callBack Optional method to be called once the request returns.
    */
    UpodiRequest.prototype.getAllProductPlans = function (callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/productplans", callBack);
    };
    /**
     * Get proudctplan by id.
     * @method getProductPlanByID
     * @memberOf UpodiRequest
     * @param ID The id of the productplan to lookup.
     * @param callBack Optional method to be called once the request returns.
    */
    UpodiRequest.prototype.getProductPlanByID = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/productplans/" + ID, callBack);
        }
    };
    /**
     * Duplicate product plan by id.
     * @method duplicateProductPlan
     * @memberOf UpodiRequest
     * @param ID THE id of the productplan to be duplicated.
     * @param callBack Optional method to be called once the request returns.
    */
    UpodiRequest.prototype.duplicateProductPlan = function (ID, callBack) {
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("POST", "https://api.upodi.io/v2/productplans/" + ID + "/duplicate", callBack);
        }
    };
    //----------------------------------------------------------------------- Transactions ------------------------------------------------------------\\
    /**
     * Get all transactions.
     * @method getAllTransactions
     * @memberOf UpodiRequest
     * @param callBack Optional method to be run once the request returns.
    */
    UpodiRequest.prototype.getAllTransactions = function (callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        this.request("GET", "https://api.upodi.io/v2/transactions", callBack);
    };
    /**
     * Get transactions by ID.
     * @method getTransactionsByID
     * @memberOf UpodiRequest
     * @param ID The ID to look for in transactions.
     * @param callBack Optional method to be run once the request returns.
    */
    UpodiRequest.prototype.getTransactionsByID = function (ID, callBack) {
        if (callBack === void 0) { callBack = emptyFunc; }
        if (ID == "") {
            throw new Error("ID has to be a non empty string");
        }
        else {
            this.request("GET", "https://api.upodi.io/v2/transactions/" + ID, callBack);
        }
    };
    return UpodiRequest;
}());
exports.default = UpodiRequest;
//# sourceMappingURL=index.js.map