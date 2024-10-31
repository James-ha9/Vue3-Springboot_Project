import axios from './axios';

// 获取头像URL
export const getAvatar = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}/avatar`);
    return response.data?.avatarUrl || null;
  } catch (error) {
    console.error('Get avatar error:', error);
    throw error;
  }
};

// 构建头像完整URL
export const getAvatarUrl = (filename) => {
  if (!filename) return null;
  // 如果已经是完整的URL，直接返回
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  // 构建访问 FileController 的完整URL
  return `${import.meta.env.VITE_API_BASE_FILE_URL}${filename}`;
};