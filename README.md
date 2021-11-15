### EasyDash To-Do

#### - Backend:

- [ ] Setup a demo account with **_view only_** privileges
- [ ] Complete the datastructure for products stored in db (Product must contain a price, **_NUMBER IN STOCK_**, etc)
  - [x] Add url from S3
- [ ] Create an endpoint to handle product **_changes_**
  - For product **name**, **price**, **category**, **subcategory**
  - Optional: A "View Changes History"
- [ ] Integrate Amazon S3 to allow image uploads
      **For brevity, we will be using REST instead of GraphQL.**
  - [ ] Setup credentials
    - [ ] Heroku environment variables
    - [x] Local environment
  - [x] Connect to bucket

#### - Frontend:

- [ ] Complete **Home Page**

  - [ ] Integrate _"Weekly sales"_
  - [ ] Show _unfulfilled orders, link to fulfillment_
  - [ ] Integrate _"Weekly sales"_
  - Optional: Integrate "Activity" panel

- [ ] Complete **Products Page**

  - [ ] Complete **Product List Item Component**
    - Component must be _reusable_ and _efficient_
    - [ ] Add **"Edit Product"** button to product list item, and flesh-out UI
  - [ ] Implement **"Create new Product"** button, and UI
    - Must utilize image upload to Amazon S3, adhering to our product creation _flow_
  - [ ] Add _Filter_ option
  - [ ] Optional: Add _Search_ option

- [ ] Complete **Orders Page**
  - This page will mainly serve as a method to allow shop owner to do a few things, including:
    - View unfulfilled orders
    - Fulfill orders
    - Send user order status
- [ ] Complete **Users Page**

* [ ] Optional: Complete **Settings Page**
