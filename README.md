# BrandOrbit
# BrandOrbit 🌐

### Influencer & Brand Management Platform

BrandOrbit is a web-based platform designed to connect brands with influencers and simplify influencer marketing campaign management. It provides a centralized environment where brands can create campaigns and manage influencer applications, while influencers can explore campaigns and apply for collaboration opportunities.

Built using the **MERN stack**, BrandOrbit demonstrates full-stack web development, role-based access, authentication, REST API integration, and database management.

---

## ✨ Features

### 🔐 User Authentication

* User registration and login.
* Secure password hashing using bcrypt.
* JWT-based authentication.
* Separate roles for brands and influencers.
* Role-based access to platform features.

### 🏢 Brand Dashboard

* Access a dedicated brand dashboard.
* Create and publish marketing campaigns.
* Provide campaign details, descriptions, and budgets.
* View available campaign information.
* Manage influencer applications and approve applications where supported by the implemented workflow.

### 🌟 Influencer Dashboard

* Access a personalized influencer dashboard.
* Browse available marketing campaigns.
* View campaign descriptions and budgets.
* Apply to campaigns that match their interests.
* Track application status where supported by the implemented workflow.

### 📢 Campaign Management

* Create and display influencer marketing campaigns.
* Store campaign information in MongoDB.
* Display campaign details, including titles, descriptions, and budgets.
* Connect brands with influencers through campaign applications.

### 🎨 User Interface

* Responsive React-based interface.
* Styled using Tailwind CSS.
* Client-side navigation with React Router.
* API communication using Axios.

---

## 🛠️ Tech Stack

| Technology           | Purpose                                |
| -------------------- | -------------------------------------- |
| React.js             | Frontend user interface                |
| Vite                 | Frontend development and build tooling |
| Tailwind CSS         | Styling and responsive layouts         |
| JavaScript           | Application logic                      |
| Node.js              | Backend runtime                        |
| Express.js           | REST API development                   |
| MongoDB Atlas        | Cloud database                         |
| Mongoose             | MongoDB object modeling                |
| JSON Web Token (JWT) | Authentication                         |
| bcryptjs             | Password hashing                       |
| Axios                | Frontend API requests                  |
| React Router         | Client-side navigation                 |
| dotenv               | Environment variable management        |
| CORS                 | Cross-origin request configuration     |
| Git & GitHub         | Version control and collaboration      |

---

## 🏗️ Project Architecture

BrandOrbit follows a client-server architecture.

```text
                  BrandOrbit
                       |
          +------------+------------+
          |                         |
     React Frontend           Express Backend
          |                         |
    React Router              REST API Routes
          |                         |
        Axios               Authentication
          |                  & Middleware
          |                         |
          +-------------------------+
                                    |
                              Mongoose ODM
                                    |
                              MongoDB Atlas
```

### Frontend

The frontend is responsible for rendering the user interface, handling navigation, collecting user input, and communicating with the backend APIs.

### Backend

The backend manages authentication, user requests, campaign operations, and application-related functionality.

### Database

MongoDB Atlas stores application data, including user accounts and campaign-related information.

---

## 📂 Project Structure

The following is a representative structure. Adjust the paths to match your actual repository.

```text
BrandOrbit/
│
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/                  # Node.js and Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

> **Note:** Your actual folder names and files may differ. Update this section to reflect your repository structure.

---

## ⚙️ Installation and Setup

Follow these steps to run BrandOrbit locally.

### Prerequisites

Install the following before starting:

* [Node.js](https://nodejs.org/)
* npm, which is included with Node.js
* A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
* Git
* A code editor such as Visual Studio Code

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd BrandOrbit
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your actual GitHub repository URL.

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory.

Add the following configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_secret
```

**Environment variables:**

* `PORT`: Port on which the backend server runs.
* `MONGO_URI`: MongoDB Atlas connection string.
* `JWT_SECRET`: Secret used to sign and verify authentication tokens.

Replace the placeholder values with your own configuration. Keep your `.env` file private.

Start the backend using the appropriate script defined in `server/package.json`. For example:

```bash
npm run dev
```

If your project uses a `start` script instead, run:

```bash
npm start
```

The backend API should be available at:

```text
http://localhost:5000
```

If your backend exposes a root endpoint, you can verify it by opening the address in your browser.

### 3. Configure the Frontend

Open a second terminal and navigate to the frontend directory:

```bash
cd client
```

Install the frontend dependencies:

```bash
npm install
```

Create a `.env` file inside the `client` directory if your frontend uses an environment variable for the backend URL.

For example:

```env
VITE_API_URL=http://localhost:5000
```

Use the variable name expected by your actual frontend code. If your code directly specifies the backend URL, you may not need this variable until you update the API configuration.

Start the frontend:

```bash
npm run dev
```

Vite will display the local URL in the terminal, commonly:

```text
http://localhost:5173
```

Open that URL in your browser to use BrandOrbit.

---

## 🔄 How BrandOrbit Works

### For Brands

1. Register for an account using the brand role.
2. Log in to access the brand dashboard.
3. Create a marketing campaign with relevant details and a budget.
4. Publish the campaign for influencers to discover.
5. Review influencer applications.
6. Approve applications through the implemented application-management workflow.

### For Influencers

1. Register for an account using the influencer role.
2. Log in to access the influencer dashboard.
3. Browse available marketing campaigns.
4. Review campaign requirements and budgets.
5. Apply to suitable campaigns.
6. Check application status if the implemented interface supports it.

---

## 🔒 Security

BrandOrbit incorporates basic security practices:

* **Password hashing:** Passwords are hashed using bcryptjs instead of being stored as plain text.
* **JWT authentication:** JSON Web Tokens support authenticated requests.
* **Role-based access:** Brand and influencer roles separate user experiences and permissions.
* **Environment variables:** Sensitive configuration values are stored outside the application source code.
* **Backend validation:** Requests should be validated by the server before database operations.

Security measures should be verified against the actual implementation before deployment.

---

## 🗄️ Database

BrandOrbit uses MongoDB Atlas as its database.

The database stores information required for user authentication, campaign management, and influencer applications.

Typical collections may include:

* **Users:** User profiles, email addresses, password hashes, and roles.
* **Campaigns:** Campaign titles, descriptions, budgets, and brand references.
* **Applications:** Influencer applications, campaign references, and application statuses.

The exact collection names and schema fields depend on the implemented Mongoose models.

---

## 🚀 Future Enhancements

Potential improvements for future versions include:

* Real-time messaging between brands and influencers.
* Integrated payment processing.
* Digital contract generation and management.
* Campaign performance analytics.
* AI-powered influencer recommendations.
* Advanced search and campaign filtering.
* Email notifications for application updates.
* Production deployment and automated testing.

These are planned enhancements and are not claimed as existing features.

---

## 🎯 Project Objectives

BrandOrbit aims to:

* Simplify collaboration between brands and influencers.
* Digitize the influencer campaign application process.
* Provide role-specific dashboards.
* Demonstrate full-stack web application development.
* Implement authentication and database integration.
* Organize campaign information in a centralized platform.

---

## 🎓 Academic Project

**Project Name:** BrandOrbit — Influencer & Brand Management Platform

**Technology:** MERN Stack

**Category:** Full-Stack Web Development

**Primary Focus:** Authentication, role-based dashboards, campaign management, REST APIs, and database integration.

---

## 👩‍💻 Contributing

Contributions and suggestions for improving BrandOrbit are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Test the changes locally.
5. Submit a pull request.

---

## 📄 License

This project is developed for educational and demonstration purposes.

If you intend to distribute or publish the project, consider adding an appropriate open-source license.

---

**BrandOrbit — Connecting Brands with Influencers.**
