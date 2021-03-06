<a name="UpodiRequest"></a>

## UpodiRequest
**Kind**: global class  

* [UpodiRequest](#UpodiRequest)
    * ## Customer calls
    * [.getAllCustomers(callBack)](#UpodiRequest.getAllCustomers)
    * [.getCustomerByAccountNumber(accountNumber, callBack)](#UpodiRequest.getCustomerByAccountNumber)
    * [.getCustomerByID(ID, callBack)](#UpodiRequest.getCustomerByID)
    * [.updateCustomer(data, callBack)](#UpodiRequest.updateCustomer)
    * [.createCustomer(data, callBack)](#UpodiRequest.createCustomer)
    * [.deleteCustomer(ID, callBack)](#UpodiRequest.deleteCustomer)
    * [.getCustomerpaymentMethods(ID, callBack)](#UpodiRequest.getCustomerpaymentMethods)
    * [.getCustomerInvoices(ID, callBack)](#UpodiRequest.getCustomerInvoices)
    * [.validatePaymentMethodByID(ID, callBack)](#UpodiRequest.validatePaymentMethodByID)
    * [.assignCardTokenToCustomer(ID, token, makeDefault, callBack)](#UpodiRequest.assignCardTokenToCustomer)
    * [.setDefaultPaymentOfCustomer(ID, PMethodID, callBack)](#UpodiRequest.setDefaultPaymentOfCustomer)
    * ## Discount calls
    * [.getAllDiscounts(callBack)](#UpodiRequest.getAllDiscounts)
    * [.getDiscountByID(ID, callBack)](#UpodiRequest.getDiscountByID)
    * [.applyDiscountToCustomer(ID, discountCode, callBack)](#UpodiRequest.applyDiscountToCustomer)
    * [.applyDiscountToSubscription(ID, discountCode, callBack)](#UpodiRequest.applyDiscountToSubscription)
    * [.applyDiscountToSubscriptionCharge(ID, discountCode, callBack)](#UpodiRequest.applyDiscountToSubscriptionCharge)
    * [.clearDiscountFromCustomer(ID, callBack)](#UpodiRequest.clearDiscountFromCustomer)
    * [.clearDiscountFromSubscription(ID, callBack)](#UpodiRequest.clearDiscountFromSubscription)
    * ## Paymentmethod calls
    * [.getAllPaymentMethods(callBack)](#UpodiRequest.getAllPaymentMethods)
    * [.getPaymentMethodByID(ID, callBack)](#UpodiRequest.getPaymentMethodByID)
    * [.getPaymentMethodsByCustomerID(ID, callBack)](#UpodiRequest.getPaymentMethodsByCustomerID)
    * [.addPaymentMethodToCustomer(paymentMethodObject, ID, callBack)](#UpodiRequest.addPaymentMethodToCustomer)
    * ## Subscription calls
    * [.getAllSubscriptions(callBack)](#UpodiRequest.getAllSubscriptions)
    * [.getSubscriptionByID(ID, callBack)](#UpodiRequest.getSubscriptionByID)
    * [.createSubscription(subscriptionObject, callBack)](#UpodiRequest.createSubscription)
    * [.activateSubscription(ID, callBack)](#UpodiRequest.activateSubscription)
    * [.resumeSubscription(ID, callBack)](#UpodiRequest.resumeSubscription)
    * [.switchSubscriptionPlan(subscriptionID, planID, callBack)](#UpodiRequest.switchSubscriptionPlan)
    * [.cancelSubscription(ID, callBack)](#UpodiRequest.cancelSubscription)
    * [.holdSubscription(ID, callBack)](#UpodiRequest.holdSubscription)
    * [.expireSubscription(ID, callBack)](#UpodiRequest.expireSubscription)
    * ## Subscription charge calls
    * [.getAllSubscriptionCharges(callBack)](#UpodiRequest.getAllSubscriptionCharges)
    * [.getSubscriptionChargeByID(ID, callBack)](#UpodiRequest.getSubscriptionChargeByID)
    * [.setAmountByID(ID, amount, callBack)](#UpodiRequest.setAmountByID)
    * [.holdSubscriptionCharge(ID, callBack)](#UpodiRequest.holdSubscriptionCharge)
    * ## Server time calls
    * [.getServerTime(callBack)](#UpodiRequest.getServerTime)
    * ## Invoice calls
    * [.getAllInvoices(callBack)](#UpodiRequest.getAllInvoices)
    * [.getInvoiceByID(ID, callBack)](#UpodiRequest.getInvoiceByID)
    * [.getInvoicePDFByID(ID, callBack)](#UpodiRequest.getInvoicePDFByID)
    * [.getInvoicePDFByInvoiceNumber(invoiceNumber, callBack)](#UpodiRequest.getInvoicePDFByInvoiceNumber)
    * [.getInvoiceByInvoiceNumber(invoiceNumber, callBack)](#UpodiRequest.getInvoiceByInvoiceNumber)
    * [.markInvoicePaid(ID, callBack)](#UpodiRequest.markInvoicePaid)
    * [.markInvoiceCanceled(ID, callBack)](#UpodiRequest.markInvoiceCanceled)
    * [.rechargeFailedPayment(ID, callBack)](#UpodiRequest.rechargeFailedPayment)
    * ## Product plan calls
    * [.getAllProductPlans(callBack)](#UpodiRequest.getAllProductPlans)
    * [.getProductPlanByID(ID, callBack)](#UpodiRequest.getProductPlanByID)
    * [.duplicateProductPlan(ID, callBack)](#UpodiRequest.duplicateProductPlan)
    * [.getAllTransactions(callBack)](#UpodiRequest.getAllTransactions)
    * [.getTransactionsByID(ID, callBack)](#UpodiRequest.getTransactionsByID)

<a name="UpodiRequest.request"></a>

### UpodiRequest.request(HTTPMethod, address, callBack, data)
Request a certain address with the apikey with a specific callback

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| HTTPMethod | "GET", "POST" or "PUT" call. |
| address | The address to call |
| callBack | The callback to run once data returns |
| data | The data to send if the call is POST or PUT |

<a name="UpodiRequest.getAllCustomers"></a>

### UpodiRequest.getAllCustomers(callBack)
Method to get all customers from the Upodi Server

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| callBack | Optional callback to run once the customers has been returned. |

<a name="UpodiRequest.getCustomerByAccountNumber"></a>

### UpodiRequest.getCustomerByAccountNumber(accountNumber, callBack)
Method to get a customer by AccountNumber.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| accountNumber | The accountNumber you want to search for |
| callBack | Optional callback to run with the customer returned. |

<a name="UpodiRequest.getCustomerByID"></a>

### UpodiRequest.getCustomerByID(ID, callBack)
Method to get a customer by the GUID used by upodi backend

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id to look for. |
| callBack | Optional callback to run with the customers as parameter. |

<a name="UpodiRequest.updateCustomer"></a>

### UpodiRequest.updateCustomer(data, callBack)
Update customers data

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| data | The data of the customer to update |
| callBack | Optional callback to run once the customer has been updated. |

<a name="UpodiRequest.createCustomer"></a>

### UpodiRequest.createCustomer(data, callBack)
Method to create a customer through the API.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| data | Minimum requirement for data to create a customer is "fullname" check https://docs.upodi.com/reference#customer-object for reference to customer object. |
| callBack | Optional callback to run once the customers has been created. |

<a name="UpodiRequest.deleteCustomer"></a>

### UpodiRequest.deleteCustomer(ID, callBack)
Method to delete customer by ID

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID to delete. |
| callBack | Optional callaback to run once the customer has been deleted. |

<a name="UpodiRequest.getCustomerpaymentMethods"></a>

### UpodiRequest.getCustomerpaymentMethods(ID, callBack)
Return a list of payment method ids. Requires API scope 'read'.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id of the customer. |
| callBack | Optional callback to run with the result of the query. |

<a name="UpodiRequest.getCustomerInvoices"></a>

### UpodiRequest.getCustomerInvoices(ID, callBack)
Get a customers invoices

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID for the customer to get invoices of. |
| callBack | Optional callback to run once the result is in. |

<a name="UpodiRequest.validatePaymentMethodByID"></a>

### UpodiRequest.validatePaymentMethodByID(ID, callBack)
Validate a customer by a payment method ID

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id of the payment method |
| callBack | Optional callback to run once the validation is complete. |

<a name="UpodiRequest.assignCardTokenToCustomer"></a>

### UpodiRequest.assignCardTokenToCustomer(ID, token, makeDefault, callBack)
Assign a cardtoken to a customer by ID.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID to assign the cardToken to. |
| token | The cardToken to assign. |
| makeDefault | Decide wether or not to make the card default or not |
| callBack | Optional callback in case you want to run something after card token has been assigned. |

<a name="UpodiRequest.setDefaultPaymentOfCustomer"></a>

### UpodiRequest.setDefaultPaymentOfCustomer(ID, PMethodID, callBack)
Set a specific payment method to default for a specific customer by ID.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the customer to set the payment method. |
| PMethodID | The ID of the payment method. |
| callBack | Optional callback to run once the payment method has been set. |

<a name="UpodiRequest.getAllDiscounts"></a>

### UpodiRequest.getAllDiscounts(callBack)
Get all discounts

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| callBack | Optional callback to run once all discount has been collected. |

<a name="UpodiRequest.getDiscountByID"></a>

### UpodiRequest.getDiscountByID(ID, callBack)
Get discount by ID

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the discount to search for. |
| callBack | Optional callback to run once a discount has been collected. |

<a name="UpodiRequest.applyDiscountToCustomer"></a>

### UpodiRequest.applyDiscountToCustomer(ID, discountCode, callBack)
Apply discount code to customer.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The customer ID to apply the code to. |
| discountCode | The discountCode. |
| callBack | Optional callback method to call after the discount code has been applied. |

<a name="UpodiRequest.applyDiscountToSubscription"></a>

### UpodiRequest.applyDiscountToSubscription(ID, discountCode, callBack)
Apply discount to a specific subscription.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id of the subscription. |
| discountCode | The discount code. |
| callBack | Optional callback to run once the discount has been applied. |

<a name="UpodiRequest.applyDiscountToSubscriptionCharge"></a>

### UpodiRequest.applyDiscountToSubscriptionCharge(ID, discountCode, callBack)
Apply discount to a specific subscriptioncharge

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id of the subscriptioncharge |
| discountCode | The discoutncode |
| callBack | Optional callback to run once the discount has been applied. |

<a name="UpodiRequest.clearDiscountFromCustomer"></a>

### UpodiRequest.clearDiscountFromCustomer(ID, callBack)
Clear discount from a customer.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id of the customer. |
| callBack | Optional callback to run once the discount has been cleared. |

<a name="UpodiRequest.clearDiscountFromSubscription"></a>

### UpodiRequest.clearDiscountFromSubscription(ID, callBack)
Clear discount from a subscription

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id of the subscription |
| callBack | Optional callback to run once the discount has been cleared. |

<a name="UpodiRequest.getAllPaymentMethods"></a>

### UpodiRequest.getAllPaymentMethods(callBack)
Get all payment methods created.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| callBack | Optional function to run once the paymenth methods has been returned. |

<a name="UpodiRequest.getPaymentMethodByID"></a>

### UpodiRequest.getPaymentMethodByID(ID, callBack)
Get payment methods by payment method ID.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the payment method. |
| callBack | Optional callback to run once the payment method has been returned. |

<a name="UpodiRequest.getPaymentMethodsByCustomerID"></a>

### UpodiRequest.getPaymentMethodsByCustomerID(ID, callBack)
Get payment method by customer id.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The customer ID. |
| callBack | Optioncal callback to run once the payment method has been returned. |

<a name="UpodiRequest.addPaymentMethodToCustomer"></a>

### UpodiRequest.addPaymentMethodToCustomer(paymentMethodObject, ID, callBack)
Add a payment method to a customer by ID.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| paymentMethodObject | The payment method object to be assigned to the given customer. See more about this object at https://docs.upodi.com/v1.0/reference#createpaymentmethod-object |
| ID | The customer ID. |
| callBack | Optional callback to run once the payment method has been added. |

<a name="UpodiRequest.getAllSubscriptions"></a>

### UpodiRequest.getAllSubscriptions(callBack)
Get all subscriptions

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| callBack | Optional function to be run one the data returns. |

<a name="UpodiRequest.getSubscriptionByID"></a>

### UpodiRequest.getSubscriptionByID(ID, callBack)
Get subscription by subscriptionID

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The subscriptionID to search for |
| callBack | Optional method to run once the data returns. |

<a name="UpodiRequest.createSubscription"></a>

### UpodiRequest.createSubscription(subscriptionObject, callBack)
Create a new subscriptions

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| subscriptionObject | The object to be posted to create a new subscription. See module link for more info of what it contains https://docs.upodi.com/v1.0/reference#subscription-object |
| callBack | Optional method to be run once the subscription has been created the retun of the request will return the newly created subscription ID. |

<a name="UpodiRequest.activateSubscription"></a>

### UpodiRequest.activateSubscription(ID, callBack)
Activate a draft or hold subscription with a subscription ID

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the subscription to be activated. |
| callBack | Optional callback function to be run after the subscription has been activated |

<a name="UpodiRequest.resumeSubscription"></a>

### UpodiRequest.resumeSubscription(ID, callBack)
Function used to resume a hold subscription.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id of the subscription to be activated. |
| callBack | Optional function to be called once the subscription is activated. |

<a name="UpodiRequest.switchSubscriptionPlan"></a>

### UpodiRequest.switchSubscriptionPlan(subscriptionID, planID, callBack)
Switch a plan of a subscription from one to another

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| subscriptionID | The ID of the subscription to be switched |
| planID | The plan ID to switch the subscription to. |
| callBack | Optional callback function to be run after the subscription plans has switched. |

<a name="UpodiRequest.cancelSubscription"></a>

### UpodiRequest.cancelSubscription(ID, callBack)
Cancel an active subscription subscription with a subscription ID

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id of the subscription to cancel |
| callBack | Optional callback function to be run after the subscription has been canceled. |

<a name="UpodiRequest.holdSubscription"></a>

### UpodiRequest.holdSubscription(ID, callBack)
Hold an active subscription from a subscriptionID

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the subscription to hold |
| callBack | Optional callback function to be run after the subscription has been put on hold. |

<a name="UpodiRequest.expireSubscription"></a>

### UpodiRequest.expireSubscription(ID, callBack)
Expire an active or hold subscription

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the subscription to be expired |
| callBack | Optional callback function to be run after the subscription has been set to expire |

<a name="UpodiRequest.getAllSubscriptionCharges"></a>

### UpodiRequest.getAllSubscriptionCharges(callBack)
Get all subscriptioncharges.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| callBack | Optional callback to run once all subscription charges are returned. |

<a name="UpodiRequest.getSubscriptionChargeByID"></a>

### UpodiRequest.getSubscriptionChargeByID(ID, callBack)
Get Subscriptioncharge by ID.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the subscriptioncharge to search for. |
| callBack | Optional callBack method to be run once the request returns. |

<a name="UpodiRequest.setAmountByID"></a>

### UpodiRequest.setAmountByID(ID, amount, callBack)
Set amount of specific subscriptioncharge

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the subscription charge to set amount for. |
| amount | The amount to set charge to. |
| callBack | Optional method to be run once the amount has been set. |

<a name="UpodiRequest.holdSubscriptionCharge"></a>

### UpodiRequest.holdSubscriptionCharge(ID, callBack)
Hold specific subscriptioncharge.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the subscriptioncharge to be put on hold. |
| callBack | Optional callback method to be run once the charge has been set on hold. |

<a name="UpodiRequest.getServerTime"></a>

### UpodiRequest.getServerTime(callBack)
Get current server time.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| callBack | Optional callback to run with the server time when returned. |

<a name="UpodiRequest.getAllInvoices"></a>

### UpodiRequest.getAllInvoices(callBack)
Get all invoices.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| callBack | Optional function to be run once the request returns. |

<a name="UpodiRequest.getInvoiceByID"></a>

### UpodiRequest.getInvoiceByID(ID, callBack)
Get one invoice by the invoiceID.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the invoice to be recieved. |
| callBack | Optional function to be run once the request returns. |

<a name="UpodiRequest.getInvoicePDFByID"></a>

### UpodiRequest.getInvoicePDFByID(ID, callBack)
Get pdf of invoice by ID.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id of the invoice. |
| callBack | Optional callback to run with the pdf when it is returned. This is in 'application/pdf' format. |

<a name="UpodiRequest.getInvoicePDFByInvoiceNumber"></a>

### UpodiRequest.getInvoicePDFByInvoiceNumber(invoiceNumber, callBack)
Get pdf of invoice by invoice number

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| invoiceNumber | The invoice number of the invoice. |
| callBack | Optioncal callback to run with the pdf when ti is returned. this is in 'application/pdf' format. |

<a name="UpodiRequest.getInvoiceByInvoiceNumber"></a>

### UpodiRequest.getInvoiceByInvoiceNumber(invoiceNumber, callBack)
Get one invoice from the invoiceNumber.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| invoiceNumber | The invoicenumber of the invoice to be recieved. |
| callBack | Optional function to be run once the request returns. |

<a name="UpodiRequest.markInvoicePaid"></a>

### UpodiRequest.markInvoicePaid(ID, callBack)
Mark an invoice as paid.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the invoice to be marked as paid. |
| callBack | Optional function to be run once the invoice is marked as paid. |

<a name="UpodiRequest.markInvoiceCanceled"></a>

### UpodiRequest.markInvoiceCanceled(ID, callBack)
Mark an invoice as canceled.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the invoice to marked canceled. |
| callBack | Optional function to be run once the invoice is marked as canceled. |

<a name="UpodiRequest.rechargeFailedPayment"></a>

### UpodiRequest.rechargeFailedPayment(ID, callBack)
Recharge an failed payment of an invoice.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID of the invoice to be recharged. |
| callBack | Optional function to be run once the invoice is marked as canceled. |

<a name="UpodiRequest.getAllProductPlans"></a>

### UpodiRequest.getAllProductPlans(callBack)
Get all productplans.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| callBack | Optional method to be called once the request returns. |

<a name="UpodiRequest.getProductPlanByID"></a>

### UpodiRequest.getProductPlanByID(ID, callBack)
Get proudctplan by id.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The id of the productplan to lookup. |
| callBack | Optional method to be called once the request returns. |

<a name="UpodiRequest.duplicateProductPlan"></a>

### UpodiRequest.duplicateProductPlan(ID, callBack)
Duplicate product plan by id.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | THE id of the productplan to be duplicated. |
| callBack | Optional method to be called once the request returns. |

<a name="UpodiRequest.getAllTransactions"></a>

### UpodiRequest.getAllTransactions(callBack)
Get all transactions.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| callBack | Optional method to be run once the request returns. |

<a name="UpodiRequest.getTransactionsByID"></a>

### UpodiRequest.getTransactionsByID(ID, callBack)
Get transactions by ID.

**Kind**: static method of [<code>UpodiRequest</code>](#UpodiRequest)  

| Param | Description |
| --- | --- |
| ID | The ID to look for in transactions. |
| callBack | Optional method to be run once the request returns. |

