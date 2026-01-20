# 🔗 URL Shortener (MERN Stack)

A full-stack **URL Shortener application** built using **React, Node.js, Express, MongoDB, and Tailwind CSS**.  
This project allows users to convert long URLs into short, shareable links and generate QR codes instantly.

---

## 🚀 Features

- Shorten long URLs into compact links  
- Redirect short URLs to original links  
- Automatic protocol handling (`google.com` → `https://google.com`)  
- QR Code generation for each short URL  
- Copy short URL to clipboard  
- Click tracking for analytics  
- Responsive UI using Tailwind CSS  
- Production-ready backend with proper error handling  

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- react-qr-code

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- NanoID
- dotenv
- CORS

---

## 📁 Project Structure

Url_Shortner/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── .env (ignored)
│ └── package.json
│
├── frontend/
│ ├── src/
│ ├── index.css
│ ├── main.jsx
│ └── package.json
│
└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
▶️ How to Run the Project Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

🌐 API Endpoints
Method	Endpoint	Description
POST	/shorten	Create a short URL
GET	/:shortId	Redirect to original URL

📌 Future Improvements

User authentication
Custom short URLs
URL expiration
Analytics dashboard



👨‍💻 Author
Aman Rathore
Backend / Full Stack Developer

⭐ Show Your Support

If you like this project, please ⭐ star the repository!



