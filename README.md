# E-Commerce Back End
## Installation

To install and run the application, follow these steps:

    Clone the repository to your local machine.

    bash

    git clone <https://github.com/sam-degrand/E-Commerce-Back-End.git>

    InstaLll the dependencies.

    bash

    cd e-commerce-back-end
    npm install

    Set up the MySQL database.

    Create a .env file in the root directory of the project.
    In the .env file, add your MySQL username, password, and database name in the following format:

    makefiLe

    DB_USER=<your-username>
    DB_PASSWORD=<your-password>
    DB_NAME=<your-database-name>

    Use thE schema.sql file in the db folder to create the database using MySQL shell commands.

    Seed the database with test data.

    bash

    npm run seed

    Start The server.

    bash

    npm start

    The server should now be running on http://localhost:3001.

## Technology

    Express.js
    MySQL
    Sequelize

