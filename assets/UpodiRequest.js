/**
 * This is a class representation of all the api calls for the Upodi API in javascript. Also includes some extra methods that uses api calls.
 * @class UpodiRequest UpodiRequest
 * @param {string} apiKey 
 */
function UpodiRequest(apiKey) {

    //API key straight from the platform
    this.apiKey = typeof(apiKey) == "string" ? apiKey :undefined;

    /**
     * Request method for any HTTP request to the a server.
     * @param {string} HTTPMethod "PUT", "GET" or "POST" to define which method to use.
     * @param {string} address The URL for the request to be sent to.
     * @param {function} callBack The method to callback on the return of the request.
     * @param {JSON} data Optional if data is needed to be sent through the request's body.
     */
    this.request = function(HTTPMethod, address, callBack, data) {
        //Store the data
        var data;

        //Check if the data is empty
        if(data === null) {
            data = JSON.stringify(false);
        } else {
            data = JSON.stringify(data);
        }

        //Check if the HTTPMethod is a string
        if(typeof(HTTPMethod) != "string") {
            console.error("HTTPMethod has to be of type string");
            return;
        }

        //Check if the address is a string
        if(typeof(address) != "string") {
            console.error("address has to be of type string");
        }
        if(callBack === undefined) {
            console.error("Callback method has to be defined");
        }

        //Make a new XMLHttpRequest
        var xhr = new XMLHttpRequest();
        
        //Adds an eventlistener when the callback is coming back
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState == this.DONE) {
                //Calling the callback function
                callBack(this.responseText);
            }
        });

        //Open the request
        xhr.open(HTTPMethod, address);
        
        //Check if api-key is undefined.
        if(this.apiKey != undefined) {        
            //Set the headers
            xhr.setRequestHeader('Authorization', "bearer " + btoa(this.apiKey));
            xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            //Send the request
            xhr.send(data)
        } else {
            //Error log if api key is invalid
            console.error("Api key is either undefined or not a string");
        }
    }

    //----------------------------------------------------------------------- Customer Methods ------------------------------------------------------------\\


    /**
     * Method to get all customers from the Upodi Server
     * @param {function} callBack The callback method to run when the request returns.
     */
    this.getAllCustomers = function(callBack) {
        this.request("GET", "https://api.upodi.io/v2/customers", function(customers) {
            //Calls the callback with the information from the request
            callBack(JSON.parse(customers));
        })
    }

    /**
     * Method to get a customer by AccountNumber.
     * @param {string} accountNumber The accountNumber you want to search for
     * @param {function} callBack The function to be run once the request returns.
     */
    this.getCustomerByAccountNumber = function(accountNumber, callBack) {
        this.request("GET", "https://api.upodi.io/v2/customers/" + accountNumber + "/accountnumber/", function(customer) {  
            callBack(JSON.parse(customer));
        });
    }

    /**
     * Method to get a customer by the GUID used by upodi backend
     * @param {string} ID The id to look for.
     * @param {function} callBack The function to be run once the request returns.
     */
    this.getCustomerByID = function(ID, callBack) {
        this.request("GET", "https://api.upodi.io/v2/customers/" + ID, function(customer) {
            callBack(JSON.parse(customer));
        });
    }

    /**
     * Method to create a customer through the API.
     * @param {JSON} data Minimum requirement for data to create a customer is "fullname" check https://docs.upodi.com/reference#customer-object for reference to customer object.
     * Also the data must be in JSON format
     * @param {function} callBack The function to be run once the request returns.
     */
    this.createCustomer = function(data, callBack) {
        if(typeof(data) != 'object') {
            console.error("Data must be a JSON object");
            return;
        }

        if(data.FullName === undefined) {
            console.error("The minimum requirement to create a customer is FullName");
            return;
        }

        this.request("POST", "https://api.upodi.io/v2/customers", function(result) {
            callBack(result);
        }, data)

    }

    /**
     * Method to delete customer by ID
     * @param {string} ID The ID to delete.
     */
    this.deleteCustomerByID = function(ID) {
        this.request("DELETE", "https://api.upodi.io/v2/customers/" + ID, function(){});
    }

    /**
     * Method to delete customer by AccountNumber
     * @param {string} accountNumber The accountNumber to delete.
     */
    this.deleteCustomerByAccountNumber = function(accountNumber) {
        var object = this;
        object.getCustomerByAccountNumber(accountNumber, function(customer) {
            if(customer) {
                object.deleteCustomerByID(customer.ID);
            }
        });
    }

    //----------------------------------------------------------------------- Card Token Methods ------------------------------------------------------------\\

    /**
     * Assign a cardtoken to a customer by ID.
     * @param {string} ID The ID to assign the cardToken to.
     * @param {string} token The cardToken to assign.
     * @param {boolean} makeDefault Decide wether or not to make the card default or not
     * @param {function} callBack Optional callback in case you want to run something after card token has been assigned.
     */
    this.assignCardTokenByID = function(ID, token, makeDefault, callBack) {
        var data = {
            "token" :token,
            "makedefault" :makeDefault
        }
        this.request("PUT", "https://api.upodi.io/v2/customers/"+ ID + "/assigncardtoken/", function(){
            if(callBack != undefined) {
                callBack();
            }
        }, data);
    }


    //----------------------------------------------------------------------- Subscription Methods ------------------------------------------------------------\\


    /**
     * Get all subscriptions
     * @param {function} callBack The function to be run one the data returns.
     */
    this.getAllSubscriptions = function(callBack) {
        this.request("GET", "https://api.upodi.io/v2/subscriptions", function(subscriptions) {
            callBack(JSON.parse(subscriptions));
        })
    }
    
    /**
     * Get subscriptions from customerID 
     * @param {string} ID The ID of the customer to find.
     * @param {function} callBack The function to run once the data returns.
     */
    this.getSubscriptionsByCustomerID = function(ID, callBack) {
         this.getCustomerByID(ID, function(customer) {
            callBack(JSON.parse(customer.Subscriptions));
         })
     }

     /**
      * Get subscription froma customers AccountNumber
      * @param {string} accountNumber The accountNumber to search for.
      * @param {function} callBack The function to be run once the data returns.
      */
    this.getSubscriptionsByAccountNumber = function(accountNumber, callBack) {
        this.getCustomerByAccountNumber(accountNumber, function(customer) {
            callBack(JSON.parse(customer.Subscriptions));
        })
    }

    /**
     * Get subscription by subscriptionID
     * @param {string} ID The subscriptionID to search for
     * @param {function} callBack The method to run once the data returns.
     */
    this.getSubscriptionByID = function(ID, callBack) {
        this.request("GET", "https://api.upodi.io/v2/subscriptions/" + ID, function(subscription) {
            callBack(JSON.parse(subscription));
        })
    }

    /**
     * Create a new subscriptions 
     * @param {JSON} subscriptionObject The object to be posted to create a new subscription. See this link for more info of what it contains https://docs.upodi.com/v1.0/reference#subscription-object
     * @param {function} callBack The method to be run once the subscription has been created the retun of the request will return the newly created subscription ID.
     */
    this.createNewSubscription = function(subscriptionObject, callBack) {
        this.request("POST", "https://api.upodi.io/v2/subscriptions", function(subscriptionID) {
            callBack(JSON.parse(subscriptionID));
        }, subscriptionObject);
    }

    /**
     * Activate a draft or hold subscription with a subscription ID
     * @param {string} ID The ID of the subscription to be activated.
     * @param {function} callBack Optional callback function to be run after the subscription has been activated
     */
    this.activateSubscription = function(ID, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + ID + "/activate/", function(result) {
            if(callBack != undefined) {
                callBack(result);
            }
        });
    }

    /**
     * Switch a plan of a subscription from one to another
     * @param {string} subscriptionID The ID of the subscription to be switched
     * @param {string} planID The plan ID to switch the subscription to.
     * @param {function} callBack Optional callback function to be run after the subscription plans has switched.
     */
    this.switchSubscriptionPlan = function(subscriptionID, planID, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + subscriptionID + "/switchplan/", function(result){
            if(callBack != undefined) {
                callBack(result);
            }
        }, planID);
    }

    /**
     * Cancel an active subscription subscription with a subscription ID
     * @param {string} ID The id of the subscription to cancel
     * @param {function} callBack Optional callback function to be run after the subscription has been canceled.
     */
    this.cancelSubscription = function(ID, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + ID + "/cancel/", function(result) {
            if(callBack != undefined) {
                callBack(result);
            }
        });
    }

    /**
     * Hold an active subscription from a subscriptionID
     * @param {string} ID The ID of the subscription to hold
     * @param {function} callBack Optional callback function to be run after the subscription has been put on hold.
     */
    this.holdSubscription = function(ID, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + ID +"/hold/", function(result) {
            if(callBack != undefined) {
                callBack(result);
            }
        })
    }
    
    /**
     * Expire an active or hold subscription
     * @param {string} ID The ID of the subscription to be expired
     * @param {function} callBack Optional callback function to be run after the subscription has been set to expire
     */
    this.expireSubscription = function(ID, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/subscriptions/" + ID +"/expire/", function(result) {
            if(callBack != undefined) {
                callBack(result);
            }
        });
    }

    //----------------------------------------------------------------------- Discount Methods ------------------------------------------------------------\\


    /**
     * Get all discounts
     * @param {function} callBack The function to run once the data returns.
     */
    this.getAllDiscounts = function(callBack) {
        this.request("GET", "https://api.upodi.io/v2/discounts", function(discounts) {
            callBack(JSON.parse(discounts));
        })
    }


    /**
     * Get discount by ID
     * @param {string} ID The ID of the discount to search for.
     * @param {function} callBack The function to be run once the data returns.
     */
    this.getDiscountByID = function(ID, callBack) {
        this.request("GET", "https://api.upodi.io/v2/discounts/", function(discounts) {
            discounts = JSON.parse(discounts);
            callBack(discounts.find(discount => discount.ID == ID));
        })
    }

    /**
     * Apply discount code to customer.
     * @param {string} ID The customer ID to apply the code to.
     * @param {string} discountCode The discountCode
     * @param {function} callBack Optional callback method to call after the discount code has been applied.
     */
    this.applyDiscountToCustomer = function(ID, discountCode, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/discounts/" + ID +"/applydiscountcodecustomer", function(result){
            if(callBack != undefined) {
                callBack(result);
            }
        }, discountCode);
    }

    //----------------------------------------------------------------------- Invoices ------------------------------------------------------------\\


    /**
     * Get all invoices.
     * @param {function} callBack The function to be run once the request returns.
     */
    this.getAllInvoices = function(callBack) {
        this.request("GET", "https://api.upodi.io/v2/invoices", function(result) {
            callBack(JSON.parse(result));
        })
    }

    /**
     * Get one invoice by the invoiceID.
     * @param {string} ID The ID of the invoice to be recieved.
     * @param {function} callBack The function to be run once the request returns.
     */
    this.getInvoiceByID = function(ID, callBack) {
        this.request("GET", "https://api.upodi.io/v2/invoices/" + ID, function(result) {
            callBack(JSON.parse(result));
        })
    }

    /**
     * Get one invoice from the invoiceNumber.
     * @param {string} invoiceNumber The invoicenumber of the invoice to be recieved.
     * @param {function} callBack The function to be run once the request returns.
     */
    this.getInvoiceByInvoiceNumber = function(invoiceNumber, callBack) {
        this.request("GET", "https://api.upodi.io/v2/invoices/" + invoiceNumber + "/number/", function(result) {
            callBack(JSON.parse(result));
        })
    }
    
    /**
     * Mark an invoice as paid.
     * @param {string} ID The ID of the invoice to be marked as paid.
     * @param {function} callBack Optional function to be run once the invoice is marked as paid.
     */
    this.markInvoicePaid = function(ID, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/invoices/" + ID + "/markpaid/", function(result) {
            callBack(result);
        })
    }

    /**
     * Mark an invoice as canceled.
     * @param {string} ID The ID of the invoice to marked canceled.
     * @param {function} callBack Optional function to be run once the invoice is marked as canceled.
     */
    this.markInvoiceCanceled = function(ID, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/invoices/" + ID + "/cancel/", function(result) {
            callBack(result);
        })
    }

    /**
     * Recharge an failed payment of an invoice.
     * @param {string} ID The ID of the invoice to be recharged.
     * @param {function} callBack Optional function to be run once the invoice is marked as canceled.
     */
    this.rechargeFailedPayment = function(ID, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/invoices/" + ID +"/recharge/", function(result) {
            callBack(result);
        })
    }

    //----------------------------------------------------------------------- Subscription Charges ------------------------------------------------------------\\
    
    /**
     * Get all subscriptioncharges.
     * @param {function} callBack The method to be called once the request returns.
     */
    this.getAllSubscriptionCharges = function(callBack) {
        this.request("GET", "https://api.upodi.io/v2/subscriptionCharges", function(result) {
            callBack(JSON.parse(result));
        })
    }

    /**
     * Get Subscriptioncharge by ID.
     * @param {string} ID The ID of the subscriptioncharge to search for.
     * @param {function} callBack The callBack method to be run once the request returns.
     */
    this.getSubscriptionChargeById = function(ID, callBack) {
        this.request("GET", "https://api.upodi.io/v2/subscriptionCharges/" + ID, function(result) {
            callBack(JSON.parse(result));
        })
    }

    /**
     * Set amount of specific subscriptioncharge
     * @param {string} ID The ID of the subscription charge to set amount for.
     * @param {number} amount The amount to set charge to.
     * @param {function} callBack Optional method to be run once the amount has been set.
     */
    this.setAmountByID = function(ID, amount, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/subscriptionCharges/" + ID + "/setamount/", function() {
            if(callBack != undefined) {
                callBack();
            }
        }, amount);
    }

    /**
     * Set amount of subscriptioncharge with specific SKU.
     * THE SKU OF THE SUBSCRIPTIONCHARGE IS THE ONE THAT IS FOUND IN THE PRODUCTPLANCHARGE.
     * @param {number} SKU The SKU to look for.
     * @param {string} ID The subscription ID
     * @param {number} amount The Amount to set the charge to.
     * @param {function} callBack Optional callback method to be run once the amount has been set.
     */
    this.setAmountOfSubscriptionBySKU = function(SKU, ID, amount, callBack) {
        var object = this;
        this.request("GET", "https://api.upodi.io/v2/subscriptions/" + ID + "/?$expand=SubscriptionCharges/ProductPlanCharge", function(result) {
            result = JSON.parse(result);
            var theCharge = result.SubscriptionCharges.find(c => c.ProductPlanCharge.SKU == SKU);
            if(theCharge != undefined) {
                object.setAmountByID(theCharge.ID, amount, function() {
                    if(callBack != undefined) {
                        callBack();
                    }
                })
            } else {
                console.error("No sku matching any of the subscriptioncharges for this subscription.")
            }
        })
    }

    /**
     * Hold specific subscriptioncharge.
     * @param {string} ID The ID of the subscriptioncharge to be put on hold.
     * @param {function} callBack Optional callback method to be run once the charge has been set on hold.
     */
    this.holdSubscriptionCharge = function(ID, callBack) {
        this.request("PUT", "https://api.upodi.io/v2/subscriptionCharges/" + ID +"/hold/", function() {
            if(callBack != undefined) {
                callBack();
            }
        })
    }

    //----------------------------------------------------------------------- Productplan ------------------------------------------------------------\\

    /**
     * Get all productplans.
     * @param {function} callBack The method to be called once the request returns.
     */
    this.getAllProductplans = function(callBack) {
        this.request("GET", "https://api.upodi.io/v2/productplans", function(result) {
            callBack(result);
        })
    }

    /**
     * Get proudctplan by id.
     * @param {string} ID The id of the productplan to lookup.
     * @param {function} callBack The method to be called once the request returns.
     */
    this.getProductPlanByID = function(ID, callBack) {
        this.request("GET", "https://api.upodi.io/v2/productplans/" + ID, function(result) {
            callBack(result);
        })
    }

    /**
     * Duplicate product plan by id.
     * @param {string} ID THE id of the productplan to be duplicated.
     * @param {function} callBack Optional method to be called once the request returns.
     */
    this.duplicateProductPlan = function(ID, callBack) {
        this.request("https://api.upodi.io/v2/productplans/" + ID + "/duplicate", function() {
            if(callBack != undefined) {
                callBack();
            }
        })
    }

    //----------------------------------------------------------------------- Transactions ------------------------------------------------------------\\
    
    /**
     * Get all transactions.
     * @param {function} callBack The method to be run once the request returns.
     */
    this.getAllTransactions = function(callBack) {
        this.request("GET",  "https://api.upodi.io/v2/transactions", function(result) {
            callBack(result);
        })
    }

    /**
     * Get transactions by ID.
     * @param {string} ID The ID to look for in transactions.
     * @param {function} callBack The method to be run once the request returns.
     */
    this.getTransactionsByID = function(ID, callBack) {
        this.request("GET", "https://api.upodi.io/v2/transactions/" + ID, function(result) {
            callBack(result);
        })
    }

}
