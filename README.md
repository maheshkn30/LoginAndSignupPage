# Login and Signup Page

A Node.js web application that provides user authentication functionality with login and signup capabilities.

---

## 🚀 Features

- **User Signup** – Create new user accounts with `firstName`, `lastName`, `email`, and `password`
- **User Login** – Authenticate users with email and password validation
- **Password Security** – Uses `bcrypt` for secure password hashing
- **User Management** – Delete user accounts by ID
- **Database Integration** – MongoDB with Mongoose ODM
- **Pagination** – Retrieve signup records with pagination support
- **Static Files** – Serves HTML pages and assets

---

## 🛠 Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Security:** bcrypt
- **Session Management:** express-session
- **Utilities:** lodash

---

## 📌 Main Routes

| Method | Route         | Description                          |
| ------ | ------------- | ------------------------------------ |
| GET    | `/`           | Serve signup page                    |
| POST   | `/signup`     | Register a new user                  |
| POST   | `/login`      | Authenticate user login              |
| DELETE | `/signup/:id` | Remove user by ID                    |
| GET    | `/signup`     | Retrieve all users (with pagination) |

---

## ⚙️ Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```
### 1️⃣ Run Server

```bash
npm start
```
