import axios from './axios';

// 用户注册
export const register = async (username, email, password) => {
  try {
    const response = await axios.post('/users/register', {
      username,
      email,
      password
    });
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// 用户登录
export const login = async (username, password) => {
  try {
    console.log('Attempting login with:', { username, password });
    const response = await axios.post('/users/login', {
      username,
      password
    });
    
    console.log('Login response:', response);
    
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('userId', response.data.user.id);
    }
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};

// 邮箱验证
export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`/users/verify-email?token=${token}`);
    return response;
  } catch (error) {
    console.error('Email verification error:', error);
    throw error;
  }
};

// 重置密码
export const resetPassword = async (email) => {
  try {
    const response = await axios.post('/users/reset-password', { email });
    return response;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};

// 确认重置密码
export const confirmResetPassword = async (email, verificationCode, newPassword) => {
  try {
    const response = await axios.post('/users/confirm-reset-password', {
      email,
      verificationCode,
      newPassword
    });
    return response;
  } catch (error) {
    console.error('Confirm reset password error:', error);
    throw error;
  }
};

// 添加登出函数
export const logout = async () => {
  try {
    // 清除本地存储的认证信息
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    
    // 清除 axios 默认请求头中的 token
    delete axios.defaults.headers.common['Authorization'];
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};
