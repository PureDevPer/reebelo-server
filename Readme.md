# Reebelo Full Stack Engineer Case Study - Server

[![typescript](https://img.shields.io/badge/typescript-5.1.6-blue.svg)](https://shields.io/)
[![express](https://img.shields.io/badge/express-4.18.2-green.svg)](https://shields.io/)
[![firebase](https://img.shields.io/badge/firebase-9.23.0-red.svg)](https://shields.io/)

A server built with Express, TypeScript and Firebase utilizing Heroku for hosting and NoSQL database functionality. The server provides various API endpoints for managing products and orders.

-   client: [https://github.com/PureDevPer/reebelo-client](https://github.com/PureDevPer/reebelo-client)

## API Endpoints

Please note that the API URL is https://reebelo-server-ae92340129c9.herokuapp.com, and the API endpoints can be accessed by appending the respective paths mentioned below.

### Product

-   GET /product: Retrieves a list of products

    -   Available Query Parameters:

        -   `brand`: Filter products by brand. _Optional_
        -   `id`: Filter products by ID. _Optional_
        -   `title`: Filter products by title. _Optional_
        -   `lastProductTitle`: Used for pagination, retrieves products after the provided last product title. _Optional_

```
https://reebelo-server-ae92340129c9.herokuapp.com/api/v1/product
```

-   POST /product: Creates a new product

    -   Request Body:

        -   `brand` (string): _Required_
        -   `category` (array): _Required_
        -   `price` (number): _Required_
        -   `quantity` (number): _Required_
        -   `title` (string): _Required_

> When `POST /product` request is triggered, `id`, `createdAt` and `lastUpdatedAt` fields are automatically added to the database

### Order

-   GET /order: Retrives a list of orders

    -   Available Query Parameters:

        -   `userId`: Filter orders by user ID. _Optional_
        -   `lastOrderId`: Used for pagination, retrieves orders after the provided last order ID. _Optional_

```
https://reebelo-server-ae92340129c9.herokuapp.com/api/v1/order
```

-   POST /order: Creates an order

    -   Request Body:

        -   `deliveryAddress` (string): _Required_
        -   `items` (array): _Required_
        -   `status` (number): _Required_
            -   processing
            -   cancelled
            -   delivered
        -   `trackingCompany` (number): _Optional_
        -   `trackingNumber` (string): _Optional_
        -   `userId` (string): _Optional_

> When `POST /order` request is triggered, `id`, `createdAt` and `lastUpdatedAt` fields are automatically added to the database

-   PUT /order: Updates an existing order

    -   Request Body:

        -   `createdAt` (string): _Required_
        -   `deliveryAddress` (string): _Required_
        -   `id` (string): _Required_
        -   `items` (array): _Required_
        -   `status` (number): _Required_
            -   processing
            -   cancelled
            -   delivered
        -   `trackingCompany` (number): _Optional_
        -   `trackingNumber` (string): _Optional_
        -   `userId` (string): _Optional_

```typescript
export interface OrderItem {
    currency: number;
    price: number;
    productId: string;
    quantity: number;
}
```

> When `PUT /order` request is triggered, `lastUpdatedAt` fields are automatically updated to the database

## Security Considerations

While the current implementation does not include security measures such as JWT tokens, it is essential to ensure the API is protected from unauthorized access. Implementing JWT token authentication would be great to restrict access to the API only to authenticated users.

## Scalability of Solutions

-   Pagination: The pagination feature has been implemented to handle large datasets, enabling the retrieval of data in smaller, manageable chunks. Although page token has not been implemented, Firebase offers built-in pagination features that can be utilized.

### Data Storage Approach

By utilizing a NoSQL database for both the Product and Order data, the system can efficiently handle the diverse structure of products and varying order item quantities, providing a more scalable and streamlined solution.

-   Product DB: It's observed that the products don't have a consistent structure. For example, some products may have additional attributes like screen size (in the case of phones), while others may not have such attributes (e.g., AirPods). Storing this varying structure in a SQL database would result in wasted space and increased complexity. To address this, a NoSQL database is chosen as a suitable solution. NoSQL databases allow for flexible and schema-less data storage, accommodating the diverse attributes of different products efficiently.

-   Order DB: Each order can contain varying numbers of items, ranging from one to multiple items. With a traditional SQL database, this would typically involve storing the order information in one table and the individual order items in another table, requiring complex relational mappings between the two. To simplify the data model and improve performance, a NoSQL database approach is chosen. In this approach, all the items within an order can be stored as an array of items within a single document, eliminating the need for separate tables and complex relationships.

## Limitations

During the implementation of the system, the following limitations were identified. Addressing these limitations would be helpful to ensure better performance,availability, and scalability during the further development and enhancement of the system.

-   **Firebase Storage Integration:** In the project, image files are stored in Firebase Storage, which is similar to AWS S3. However, the implementation of file uploads to the storage has not been included due to the cost associated with storage usage beyond a certain limit. Additionally, the storage is currently configured as a public API, allowing anyone to access the stored files.
-   **Single Server:** The current system is running on a single server, which poses a risk. If the server goes down due to any reason, the entire system will become inaccessible. To enhance system availability and resilience, it is recommended to implement multiple servers for each service, ensuring redundancy and failover capabilities.
-   **Load Balancer:** The system lacks a load balancer, which can lead to uneven distribution of traffic across servers. In the absence of a load balancer, one server may become overloaded while others remain underutilized. It is advisable to incorporate a load balancer that can evenly distribute incoming requests and provide fault tolerance. Additionally, duplicating the load balancer can further enhance the stability of the system.
-   **Product DB Read Heavy:** The product database is anticipated to experience heavy read operations as users may search for multiple items. To optimize the system's performance, a Master-Slave database design can be implemented. The Master database can handle all write requests, while multiple read replicas can handle the read requests, ensuring efficient handling of read-heavy operations.
-   **Order DB Archive:** Most users are primarily interested in their recent orders and are less likely to interact with orders placed over a year ago. To maintain good performance for the order database, it is recommended to archive past orders into a separate Archive database. This approach will help improve the system's overall performance by segregating active and historical data.
-   **Cache:** Caching can significantly improve the system's performance and response time. Storing frequently accessed data, such as recent order statuses, recommendations, and popular products, in a cache can reduce the need for repetitive database queries. This approach allows the system to retrieve data quickly and provide a better user experience.
-   **Message Queue:** Introducing a message queue between third-party services, such as the payment system, and the order system, can help decouple the services and reduce interdependencies. By utilizing a message queue, the systems can communicate asynchronously, improving fault tolerance and scalability. It also enables handling high loads without impacting the overall system performance.
