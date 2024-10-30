import axios from './axios';

// 获取头像
export const getAvatar = async (filename) => {
  try {
    const response = await axios.get(`/files/avatars/${filename}`, {
      responseType: 'blob'
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Get avatar error:', error);
    throw error;
  }
};