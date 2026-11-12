
# ShopSphere – E-commerce API

## 1. Project Overview

ShopSphere is a Node.js-based e-commerce backend designed
to manage users, products, and customer orders.

The application provides basic functionalities for an
online shopping platform, including user authentication,
product management, and order processing.

This repository is used as a demonstration project for
MoonLens, an AI-powered code review platform combining
static analysis, Retrieval-Augmented Generation (RAG),
and Large Language Models (LLMs).

## 2. Technologies

- JavaScript (Node.js)
- Express.js
- MySQL
- mysql2
- JSON Web Tokens (JWT)

## 3. Project Structure

```text
ShopSphere/
│
├── README.md
├── authController.js
├── productService.js
├── orderController.js
└── database.js
```

## 4. Application Architecture

The application follows a simple modular architecture.

### Authentication Module

File: `authController.js`

Responsible for:
- User registration.
- User login.
- JWT token generation.
- Account deletion.

### Product Management Module

File: `productService.js`

Responsible for:
- Retrieving products.
- Creating products.
- Updating product prices.
- Calculating discounts.
- Deleting products.

### Order Management Module

File: `orderController.js`

Responsible for:
- Creating customer orders.
- Calculating order totals.
- Updating product stock.
- Cancelling orders.
- Retrieving user orders.

### Database Module

File: `database.js`

Provides shared database access functionality.

It manages:
- MySQL connection configuration.
- SQL query execution.
- Database connectivity.

All application modules rely on this module
to interact with the database.

## 5. Business Rules

The application is based on the following business rules:

1. Each user must have a unique email address.
2. Users must authenticate before accessing protected operations.
3. Products must have valid prices and stock quantities.
4. Orders must contain at least one product.
5. Product stock must never become negative.
6. Order totals must correspond to product prices
   multiplied by their requested quantities.
7. Cancelling an order should restore the associated
   product quantities.
8. Users should only access their own orders.
9. Administrative operations must be restricted
   to authorized users.

## 6. Known Code Quality Challenges

This repository intentionally contains code-quality
and security issues for testing and demonstration.

The following areas require particular attention:

### Security

- SQL injection vulnerabilities.
- Hardcoded credentials and secrets.
- Insecure password handling.
- Missing authorization checks.
- Sensitive information exposure.

### Clean Code

- Duplicated business logic.
- Insufficient input validation.
- Poor exception handling.
- Unclear separation of responsibilities.

### SOLID Principles

- Single Responsibility Principle violations.
- Business logic mixed with HTTP handling.
- Tight coupling between application components.

### Reliability

- Missing database transactions.
- Potential race conditions during stock updates.
- Missing stock validation.
- Inconsistent error handling.

## 7. MoonLens Evaluation Objectives

ShopSphere serves as a test repository for evaluating
MoonLens code review capabilities.

The main objectives are:

- Detect security vulnerabilities.
- Identify code smells.
- Evaluate SOLID principle compliance.
- Detect business logic errors.
- Generate contextual explanations.
- Provide actionable recommendations.

The repository is intentionally imperfect.
Its vulnerabilities are part of the evaluation dataset
and must not be considered acceptable production practices.

## 8. Disclaimer

This project is intended exclusively for educational,
testing, and software quality evaluation purposes.

It contains intentionally vulnerable code and must not
be deployed in a production environment.
