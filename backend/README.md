# Backend Setup

## MySQL Schema

```
CREATE DATABASE ticket_system;
USE ticket_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## .env Setup

Copy `.env.example` to `.env` and fill in your MySQL credentials and a JWT secret:
```
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=ticket_system
JWT_SECRET=your_jwt_secret
```

## Local MySQL
- Install MySQL Community Server
- Create the database and tables using the schema above
- Start the backend: `npm run dev`

## AWS RDS (Cloud MySQL)
- Create an RDS MySQL instance in AWS
- Whitelist your IP for access
- Use the RDS endpoint, username, and password in your `.env` file
- The backend will connect to RDS automatically 