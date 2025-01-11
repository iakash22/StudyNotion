# StudyNotion - Ed-Tech Platform

StudyNotion is a full-stack ed-tech platform built using MERN stack (MongoDB, Express.js, React.js, Node.js) that provides a seamless learning experience for students and instructors.

## Project Brief
StudyNotion aims to create an immersive learning experience through:
- **Course Creation and Management**: Instructors can create, edit, and delete courses. Each course can have multiple modules and lessons.
- **Content Delivery**: Courses can include various types of content such as videos, documents, and quizzes. The platform supports video playback and file uploads.
- **Progress Tracking**: Students can track their progress through courses, with completion statuses and progress bars.
- **Payment Integration**: Secure payment processing using Razorpay for course purchases.
- **Cloud Storage**: Integration with Cloudinary for storing and managing media files.
- **Responsive Design**: The platform is designed to be fully responsive, providing a seamless experience across devices.



## Table of Contents
- [Overview](#studynotion---ed-tech-platform)
- [Project Brief](#project-brief)
- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Functionality](#functionality)
- [Optimizations](#optimizations)
- [Installation](#installation)
- [Contributing](#contributing)
- [Additional Notes](#additional-notes)
- [Deployment](#deployment)
- [Demo](#demo)




## Screenshots

![App Screenshot](./public/Homepage.png)


## Features

- User Authentication and Authorization
- Course Management
- Payment Integration (Razorpay)
- Cloud Storage (Cloudinary)
- Progress Tracking
- Responsive Design

### Authorization Roles
- Admin: Full system access
- Instructor: Course management
- Student: Course access

## Technologies Used
 
- **Frontend**: React, Vite, Redux, React Dropzone, Video React
- **Backend**: Node.js, Express, Mongoose, cloudinary.
- **Database**: MongoDB
- **Other**: dotenv, nodemon, express-fileupload, cors.


## Project Structure

### Client Directory


```
client/
├── public/
│   └── assets/
├── src/
│   ├── assets/
│   │   ├── Images/
│   │   └── Videos/
│   ├── components/
│   │   ├── common/
│   │   ├── core/
│   │   ├── dashboard/
│   │   └── forms/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── reducer/
│   ├── services/
│   │   ├── apis.js
│   │   ├── authAPI.js
│   │   └── operations/
│   ├── slices/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── package.json
└── tailwind.config.js


```

### Server Directory

```


server/
├── config/
│   ├── cloudinary.js
│   ├── database.js
│   └── razorpay.js
├── controllers/
│   ├── auth.js
│   ├── course.js
│   ├── payments.js
│   └── profile.js
├── middlewares/
│   ├── auth.js
│   └── error.js
├── models/
│   ├── Course.js
│   ├── OTP.js
│   ├── Profile.js
│   └── User.js
├── routes/
│   ├── course.js
│   ├── payments.js
│   ├── profile.js
│   └── user.js
├── utils/
│   ├── emailTemplate.js
│   ├── imageUploader.js
│   └── mailSender.js
├── .env
├── package.json
└── server.js


```

## Functionality

- User Registration/Login
- Course Creation/Edit/Delete 
- Course Purchase
- Video Content Streaming
- Progress Tracking
- Profile Management
- Payment Processing
- Admin Dashboard

### Client-Side Functionality

**Core Features**
- Redux state management
- Protected route handling
- Form validation (Formik)
- Responsive design (Tailwind CSS)
- Real-time updates

**User Interface**
- Dynamic course catalog
- Video player integration
- Interactive dashboard
- Progress tracking UI
- Payment gateway interface

**Data Management**
- Redux toolkit implementation
- Axios interceptors
- Local storage handling
- Form state management
- Error boundary implementation

### Component Architecture
```
/components
├── Common/        - Reusable components
├── Core/          - Essential features
├── Dashboard/     - Admin interfaces
└── Forms/         - Input components
```

### Route Structure
```
/routes
├── Public/       - Accessible routes
├── Private/      - Protected routes
└── Shared/       - Common routes
```



### Server-Side Functionality

**API Integration**
- RESTful API architecture
- JWT token-based authentication
- Cloudinary for media storage
- Razorpay payment gateway
- Nodemailer for email services

**Authentication & Authorization**
- Role-based access control (Student/Instructor/Admin)
- JWT token validation middleware
- Password encryption using bcrypt
- OTP verification for email
- Protected route middleware

**Database Operations**
- MongoDB aggregation pipelines
- Mongoose schema validation
- Database indexing for optimization
- Efficient query handling
- Relationship management between collections

**Security Measures**
- Rate limiting
- CORS implementation
- XSS protection
- Input validation
- Error handling middleware


### API Endpoints
```
/api/v1/user      - Authentication routes
/api/v1/courses   - Course management
/api/v1/payments  - Payment processing
/api/v1/profile   - User profile operations
/api/v1/admin     - Admin operations
```
## Optimizations

**Performance Optimizations**
- Lazy loading components
- Image optimization
- Debounced search
- Memoized components
- Code splitting

**Server Side Optimizations**
- Caching strategies
- Compression middleware
- Efficient file uploading
- Query optimization
- Connection pooling


**Optimize user authenticate (Login and Signup) :**
- We can create backend using node.js, express and mongoodb.
- Email Verication 
- Also Add User Setting functionalties `(Update Profile details, reset password)`


## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/iakash22/StudyNotion.git
    ```

2. Navigate to the project directory:

    ```sh
    cd study-notion
    ```

3. Install the dependencies for both the client and server:

    ```sh
    npm install
    cd client
    npm install
    cd ..
    cd server
    npm install
    ```

4. Create a `.env` file in the root directory and add your environment variables:

    ```env
    DATABASE_URL=your_database_url
    PORT=your_port
    ```

5. Start the development server:

    ```sh
    npm run dev
    ```
## Contributing

Contributions are welcome! 

Please feel free to submit a Pull Request or open an Issue if you have any suggestions or improvements.

    1. Fork the repository
    2. Create a new branch (git checkout -b feature-xyz)
    3. Make changes and commit (git commit -am 'Add feature xyz')
    4. Push to the branch (git push origin feature-xyz)
    5. Create a new pull request
## Additional Notes

- Make sure you have Node.js and npm installed on your machine.
- The application uses a RESTful API backend, so ensure the backend server is running and accessible for API calls.
- You can check for available API documentation in the backend repository (if available).
## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Demo

Live Demo https://3d-house-scene.netlify.app/