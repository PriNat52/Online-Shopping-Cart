# Online-Shopping-Cart
# Forced Member sign-in shopping cart style.

  This application was developed in the forced member sign-in shopping style, where the inventory of shop items is available for viewing to public and requests for sign in details before purchase of any items from the shop. Developed using Node.js and MongoDB.

npm install bootstrap
npm install --save cookie-parser
npm install --save expree-session

Database Details:(Total: 3)
inventoryDB
cartDB
customerDB

Note: Changes after Demo/Presentation.

Member Side:
After valid sign in, Customer name generates successfully.
Customer shopping details is saved to cartDB.
Inventory list updates quantity and displayed to the customer.
Session destoryed.

Admin Side:
Member cart - Add,Edit and Delete functions are fixed.

Rest API:(Total: 3)
Search by name, price range and entire shopping list done in both Json and XML
and executes successfully in Postman.
