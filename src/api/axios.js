import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 只有在非重置密码相关的请求时才自动跳转
    const isResetPasswordRequest = error.config.url.includes('reset-password');
    
    if (error.response?.status === 401 && !isResetPasswordRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    
    // Log other errors
    console.error('API Error:', error);
    
    return Promise.reject(error);
  }
);

// // 响应拦截器
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('userId');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
