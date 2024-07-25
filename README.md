# Book-Search-Engine-Mern

## Description

The MERN Book Search Engine is a web application that allows users to search for books using the Google Books API and save their favorite books to their personal list. The application is built using the MERN stack (MongoDB, Express.js, React, Node.js) and has been refactored to use a GraphQL API with Apollo Server, replacing the previous RESTful API implementation.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Features](#features)
- [Deployed Application](#deployed-application)
- [Technologies](#technologies)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/mern-book-search-engine.git
   ```

2. **Navigate to the project directory**:
    ```sh
    cd mern-book-search-engine
    ```
3. **Install server and client dependencies**:
    ```sh
    npm run install
    ```
4. **Set up environment variables**:
    * Create a .env file in the project root directory and add the following:
    ```sh
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/googlebooks?retryWrites=true&w=majority
    ```
5. **Run the application**:
    ```sh
    npm run develop
    ```

## Usage
Once the application is running, open your browser and navigate to http://localhost:3000. You can search for books, sign up for an account, log in, save books to your account, view your saved books, and remove books from your saved list.

## Screenshots

1. **Homepage**
![alt text](assets/images/homepage.jpg)
2. **User Authentication**
![alt text](assets/images/user-signup.jpg)
3. **Search for Books**
![alt text](assets/images/searched-books.jpg)
4. **Save Books**
![alt text](assets/images/saved-books.jpg)
5. **View Saved Books**
![alt text](assets/images/view-saved-books.jpg)
6. **Remove Books**
![alt text](assets/images/remove-saved-books.jpg)
## Features
* **Search for Books**: Users can search for books using the Google Books API.
* **User Authentication**: Users can sign up and log in to their accounts.
* **Save Books**: Logged-in users can save books to their personal list.
* **View Saved Books**: Users can view the books they have saved.
* **Remove Books**: Users can remove books from their saved list.

## Deployed Application
The application is deployed and can be accessed at the following URL: [Book-Search_engine_Mern](https://book-search-engine-mern-uypu.onrender.com/)

## Technologies
* **MongoDB**: Database to store user and book data.
* **Express.js**: Backend framework for building the server and APIs.
* **React**: Frontend library for building user interfaces.
* **Node.js**: JavaScript runtime for server-side programming.
* **GraphQL**: Query language for the API.
* **Apollo Server**: GraphQL server to handle API requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or enhancements.

## Tests

There are currently no tests for this project.

## Questions

For any questions or inquiries, please contact me via email at [Sam Cowman](sam.p.cowman@gmail.com).

You can also find more of my work on [GitHub](https://github.com/Sam-Cowman).

---

© 2024 Sam Cowman