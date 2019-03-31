## Overview
An Amazon-like storefront that will take in orders from customers and deplete stock from the store's inventory. The app has a manager view in which it 
allows the manager to view inventory, view low inventory < 5, add to inventory, and add a new product. Both applications connect to a MySQL database to 
pull and populate information.

### Bamazon Customer View 

* The products table has each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)
   
* The customer can enter the store front and view from the available products in the database.

* The customer can purchase a product and the app will total the price of the customer's cart and deduct from the quantity in the database.

* If the customer is requesting an amount of the product that is above inventory levels, the app will decline the purchase and state there are insufficient quantities. 

- - -

### Bamazon Manager View

* List of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

 * If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.

 * If a manager selects `View Low Inventory`, then it will list all items with an inventory count lower than five.

 * If a manager selects `Add to Inventory`, the app will display a prompt that will let the manager "add more" of any item currently in the store.

 * If a manager selects `Add New Product`, it will allow the manager to add a completely new product to the store and specify product name, department name, stock quantity, and price.

### See the App Live in Action! Click on the Link Below!
https://youtu.be/1UmS1dJmRvE
