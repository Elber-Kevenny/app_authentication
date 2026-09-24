
# ✈️ Travel Agency Management API & Dashboard

This is a complete system for managing a travel agency. The project features a **robust backend built with Node.js and Fastify**, database integration with **PostgreSQL**, and a lightweight, responsive **server-side rendering (SSR) frontend** using **Handlebars and Bootstrap**.

The project adopts two modern authentication approaches: **Cookie-based Sessions (for the user interface)** and **JWT Tokens (for API endpoints)**.

---

## 🛠️ Technologies Used

### **Backend & Database**

* **Node.js** with **TypeScript**: Static typing for greater control, security, and code maintainability.
* **Fastify**: Web framework focused on high performance and low overhead.
* **Sequelize**: ORM for manipulation and integration with the **PostgreSQL** database.
* **Node Crypto (`pbkdf2`)**: Native Node.js module used for secure password hashing with *Salt*.
* **Passport.js (`@fastify/passport`)**: Flexible authentication middleware to manage sessions and JWT strategies.
* **`@fastify/session` & `@fastify/cookie**`: Management and persistence of user sessions via cookies.
* **JSON Web Token (JWT)**: Stateless authentication for API routes.

### **Frontend**

* **Handlebars.js (`@fastify/view`)**: Template engine for dynamic server-side rendering.
* **Bootstrap 5 & Bootstrap Icons**: CSS framework for modern and responsive styling of the Dashboard.

---

## 🚀 How to Run the Project

### **Prerequisites**

* Node.js (v18 or higher)
* Configured and running PostgreSQL Database.

### **Step by Step**

1. **Clone the repository:**

```bash
git clone https://github.com/Elber-Kevenny/app_authentication.git
cd nome-do-repositorio

```

2. **Install dependencies:**

```bash
npm install

```

3. **Configure Environment Variables:**
Create a `.env` file in the root of the project with your database credentials and application secrets:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_
SESSION_SECRET=sua_chave_secreta_para_session_super_segura
JWT_SECRET=sua_chave_secreta_para_jwt_super_segura

```

4. **Run the server in development mode:**

```bash
npm run dev

```

5. **Access the application:**
Access the URL in your browser: `http://localhost:3000`

---

## 🔐 Security & Authentication (Technical Explanation)

### 1. Why store Hash + Salt instead of an Encrypted Password?

In this project, the application **never stores and never knows the user's real password**. Instead, we use the `PBKDF2` (Password-Based Key Derivation Function 2) algorithm with **Salt** and **Hash**.

#### 💡 **Advantages of this approach:**

* **Security against Database leaks:** If an attacker breaches the database and gains access to the user table, they will only see random character strings (*hash* and *salt*). They **will not be able to decrypt the password**, as the hashing process is a one-way function.
* **Protection against Rainbow Tables:** Rainbow tables are huge databases containing precomputed hashes of common passwords. By generating a **unique Salt (random string) per user**, the final hash changes completely — even if two users have the exact same password (e.g., `123456`). This invalidates any precomputed table.
* **Protection against Brute-Force Attacks:** The `PBKDF2` algorithm applies thousands of computation iterations (*rounds*), making attempts to guess passwords via brute force extremely slow and impractical for an attacker.

---

### 2. Authentication Flows in the Application

The project combines two distinct authentication strategies depending on the request context:

```
                  ┌─── [ Web Interface / SSR ] ───> Cookies & Sessions (1 Day)
                  │
[ Request ] ──────┤
                  │
                  └─── [ API Endpoints ] ─────────> Authorization: Bearer <JWT>

```

#### **A. Web Flow (Sessions + Cookies):**

1. The user sends credentials in the login form.
2. The `authenticate` function searches for the user in the database, retrieves the *salt*, and recalculates the *hash* of the provided password.
3. If the hashes match, **Passport.js** steps in: it **serializes** the user ID and saves it to the session.
4. The server sends a signed cookie containing the session ID to the browser.
5. Protected Dashboard routes verify the session via cookie (`@fastify/session`), keeping the user logged in for **24 hours (1 day)**.

#### **B. API Flow (`/api/auth` and `/api/test` via JWT):**

1. On the `/api/auth/` route, the client sends their credentials and receives a signed **JWT token** in response.
2. To access protected API routes (such as `/api/test`), the client must send the token in the HTTP header:
`Authorization: Bearer <YOUR_JWT_TOKEN>`
3. The middleware `preValidation: fastifyPassport.authenticate('jwt', { session: false })` validates the token signature before allowing access to the route, operating completely *stateless* (without saving a session on the server).

---

## ⚙️ Development Tips & Customization

* **Alert Script on Dashboard:** If you want to implement interactions on the user panel (Dashboard) buttons, make sure to remove or disable the alert script (`<script>alert(...)</script>`) attached to the Dashboard HTML page.
* **TypeScript Mode:** To build the project for production, use the configured compiler scripts (`npm run build`).