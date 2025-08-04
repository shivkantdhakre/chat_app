# Web Chat Application

A real-time chat application built with React, Node.js, Socket.IO, and MongoDB. Features include user authentication, private messaging, chat rooms, and real-time message updates.

## 🚀 Features

- **User Authentication**: Register, login, and logout functionality
- **Real-time Messaging**: Instant message delivery using Socket.IO
- **Private Chats**: One-on-one conversations between users
- **Chat Rooms**: Group conversations with multiple users
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **User Search**: Find and start private conversations with other users
- **Room Management**: Create and join chat rooms
- **Session Management**: Persistent login sessions

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Socket.IO Client** - Real-time communication
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Web-Chat-main
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../rtc_websockets
npm install
```

### 4. Database Setup

Make sure MongoDB is running on your system. The app will connect to `mongodb://localhost:27017/chatapp`.

### 5. Seed Sample Data (Optional)

```bash
cd backend
node seedData.js
```

This will create 5 sample users and 4 chat rooms for testing.

### 6. Start the Application

#### Start Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:4000`

#### Start Frontend Development Server

```bash
cd rtc_websockets
npm run dev
```

The frontend will run on `http://localhost:5173`

## 👥 Sample Users (After Seeding)

You can login with any of these accounts:

- **Username**: alice, **Password**: password123
- **Username**: bob, **Password**: password123
- **Username**: charlie, **Password**: password123
- **Username**: diana, **Password**: password123
- **Username**: emma, **Password**: password123

## 🎯 Usage

### 1. Authentication

- Visit `http://localhost:5173`
- Click "Sign up" to create a new account or "Login" to use existing credentials
- After successful login, you'll be redirected to the home page

### 2. Private Chats

- On the home page, use the search bar to find users
- Click on a user to start a private conversation
- Messages are sent and received in real-time

### 3. Chat Rooms

- View existing rooms in the "Join or Create a Chat Room" section
- Click on a room to join
- Create new rooms using the form at the bottom
- All users in the room can see and respond to messages

### 4. Navigation

- Use the navigation header to see your username and logout
- The app automatically redirects to login if not authenticated

## 🔧 API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user

### Rooms

- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create a new room
- `GET /api/rooms/:id` - Get specific room

### Messages

- `GET /api/messages` - Get messages
- `POST /api/messages` - Send a message

## 🏗️ Project Structure

```
Web-Chat-main/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── socket/         # Socket.IO handlers
│   ├── app.js          # Main server file
│   ├── db.js           # Database connection
│   └── seedData.js     # Database seeding script
├── rtc_websockets/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React context
│   │   ├── pages/      # Page components
│   │   ├── App.jsx     # Main app component
│   │   └── main.jsx    # App entry point
│   └── package.json
└── README.md
```

## 🎨 Customization

### Styling

- The app uses Tailwind CSS for styling
- Modify `rtc_websockets/src/index.css` for global styles
- Update component classes for custom styling

### Features

- Add new features by extending the existing components
- Modify the Socket.IO handlers in `backend/socket/socketHandler.js`
- Update API endpoints in the backend routes

## 🚀 Deployment

### Frontend Build

```bash
cd rtc_websockets
npm run build
```

### Backend Production

- Set environment variables for production
- Use a process manager like PM2
- Configure MongoDB for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify MongoDB is running
3. Ensure all dependencies are installed
4. Check the network tab for failed API requests

## 🎉 Features Added in This Version

- ✅ User authentication with protected routes
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Real-time messaging with Socket.IO
- ✅ User avatars and better visual design
- ✅ Improved error handling
- ✅ Session management
- ✅ Sample data seeding
- ✅ Comprehensive documentation
