import axios from "axios";

const api = axios.create({
    baseURL: "https://researchmind-ai-eg6j.onrender.com/api",
});

// const api = axios.create({
//     baseURL: "http://localhost:5000/api",
// });

export default api;