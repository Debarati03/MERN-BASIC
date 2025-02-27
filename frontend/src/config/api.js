const API_URL = import.meta.env.MODE === 'production' 
  ? 'https://mern-basic-lc7u.onrender.com/api'  // Your Render backend URL
  : 'http://localhost:5000/api';                 // Local development URL

export default API_URL;