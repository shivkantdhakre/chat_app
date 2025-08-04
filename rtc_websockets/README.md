# 🚀 Modern Web Chat Application

A beautiful, modern real-time chat application built with React, Node.js, and WebSocket technology.

## ✨ Features

### 🎨 Modern UI/UX

- **Dark Theme Design**: Sleek dark interface with modern color scheme
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Real-time Messaging**: Instant message delivery with WebSocket
- **User Authentication**: Secure login and registration system
- **Room Management**: Create and join chat rooms
- **User Search**: Find and connect with other users

### 🛠️ Technical Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with bcrypt password hashing
- **Real-time**: WebSocket connections for live messaging

### 🎯 Key Components

#### Modern Chat Layout

- **Sidebar Navigation**: User and room management
- **Main Chat Area**: Message display and input
- **Header**: User info and navigation controls
- **Responsive Design**: Mobile-friendly interface

#### Authentication System

- **Secure Login**: Username/password authentication
- **User Registration**: Account creation with validation
- **JWT Tokens**: Secure session management
- **Auto-login**: Automatic login after registration

#### Real-time Features

- **Live Messaging**: Instant message delivery
- **Room Joining**: Join existing chat rooms
- **User Status**: Online/offline indicators
- **Message History**: Persistent message storage

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Web-Chat-main
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../rtc_websockets
   npm install
   ```

4. **Start MongoDB**

   ```bash
   # Make sure MongoDB is running on localhost:27017
   ```

5. **Start the backend server**

   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend development server**

   ```bash
   cd rtc_websockets
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎨 Design Features

### Modern Color Scheme

- **Primary Background**: Deep dark blue (#0f0f23)
- **Secondary Background**: Dark navy (#1a1a2e)
- **Card Background**: Dark blue-gray (#16213e)
- **Accent Color**: Modern purple (#4f46e5)
- **Text Colors**: White and gray variations for hierarchy

### Interactive Elements

- **Hover Effects**: Smooth transitions and animations
- **Focus States**: Clear visual feedback
- **Loading States**: Spinner animations
- **Error Handling**: User-friendly error messages

### Typography & Spacing

- **Modern Font**: Inter font family
- **Consistent Spacing**: 8px grid system
- **Readable Text**: High contrast ratios
- **Responsive Typography**: Scales with screen size

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your-secret-key-here
PORT=4000
```

### Customization

The application uses CSS custom properties for easy theming:

```css
:root {
  --primary-bg: #0f0f23;
  --secondary-bg: #1a1a2e;
  --accent-color: #4f46e5;
  /* ... more variables */
}
```

## 📱 Mobile Support

The application is fully responsive with:

- **Touch-friendly buttons**: Large tap targets
- **Mobile navigation**: Collapsible sidebar
- **Optimized layouts**: Stacked on small screens
- **Gesture support**: Swipe and touch interactions

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Stateless session management
- **Input Validation**: Server-side validation
- **XSS Protection**: Sanitized user inputs
- **CORS Configuration**: Secure cross-origin requests

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
cd rtc_websockets
npm run build
# Deploy the dist folder
```

### Backend (Heroku/Railway)

```bash
cd backend
# Set environment variables
# Deploy with Node.js support
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using modern web technologies**
