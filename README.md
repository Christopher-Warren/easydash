### EasyDash To-Do

#### - Backend:

- [ ] Setup a demo account with **_view only_** privileges
- [x] Require authentication for **Mutations** that modify sensative data
- [x] Require authentication for **Queries** that contain sensative store information. e.g. _All Orders_
- [x] Integrate Amazon S3 to allow image uploads
      **For brevity, we will be using REST instead of GraphQL.**
- [x] Save returned Amazon S3 Urls to appropriate mongo product, must
      use promises to achieve this cleanly

  - [x] Setup credentials
    - [x] Enable plublic read access
    - [x] Heroku environment variables
    - [x] Local environment
  - [x] Connect to bucket

  - [ ] Complete **Home Page**

  - [ ] Integrate _"Weekly sales"_
  - [ ] Show _unfulfilled orders, link to fulfillment_
  - [ ] Integrate _"Weekly sales"_
  - [ ] Integrate "Activity" panel

  - [x] **Endpoints**

    - [x] CRUD operations for products
      - [x] Create, read, update, delete
      - [x] _Filter_ mongodb
      - [x] _Search_ search
    - [x] CRUD operations for orders
      - [x] Create, read, update, delete
      - [x] _Filter_ mongodb
      - [x] _Search_ search
    - [x] _Filter_ mongodb
    - [x] _Search_ search

#### - Frontend:

- [ ] Complete **Home Page**

  - [ ] Integrate _"Weekly sales"_
  - [ ] Show _unfulfilled orders, link to fulfillment_
  - [ ] Integrate _"Weekly sales"_
  - [ ] Integrate "Activity" panel

- [x] Complete **Products Page**

  - [x] Complete **Product List Item Component**
    - Component must be _reusable_ and _efficient_
    - [x] Add **"Edit Product"** button to product list item, and flesh-out UI
  - [x] Implement **"Create new Product"** button, and UI
    - Must utilize image upload to Amazon S3, adhering to our product creation _flow_
  - [x] Implement _Filter_ feature
  - [x] Implement _Search_ feature

- [x] Complete **Orders Page**

- [ ] Optional: Complete **Users Pages**

* [ ] Optional: Complete **Settings Page**
