import axios from './axios';

/**
 * @typedef {Object} AccountSettings
 * @property {string} [phone] - 手机号
 * @property {string} [email] - 邮箱
 * @property {string} [wechatId] - 微信ID
 * @property {string} [verificationCode] - 验证码
 * @property {boolean} [deactivate] - 是否注销账号
 */

/**
 * 更新账户设置
 * @param {string} userId - 用户ID
 * @param {AccountSettings} settings - 账户设置
 */
export const updateAccountSettings = async (userId, settings) => {
  try {
    const response = await axios.put(`/users/${userId}/settings`, settings);
    return response;
  } catch (error) {
    console.error('Update settings error:', error);
    throw error;
  }
};

// 获取用户资料
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}/profile`);
    return response;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};

// 更新用户资料
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`/users/${userId}/profile`, profileData);
    return response;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// 获取账户设置
export const getAccountSettings = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}/settings`);
    return response;
  } catch (error) {
    console.error('Get settings error:', error);
    throw error;
  }
};

// 上传头像
export const uploadAvatar = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`/users/${userId}/profile/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    console.error('Upload avatar error:', error);
    throw error;
  }
};

// 获取头像URL
export const getAvatarUrl = (filename) => {
  if (!filename) return null;
  return `${import.meta.env.VITE_API_BASE_URL}/files/avatars/${filename}`;
};

// 绑定手机号
export const bindPhone = (userId, phone, verificationCode) => {
  return axios.post(`/users/${userId}/bind-phone`, {
    phone,
    verificationCode
  });
};

// 绑定邮箱
export const bindEmail = (userId, email, verificationCode) => {
  return axios.post(`/users/${userId}/bind-email`, {
    email,
    verificationCode
  });
};

// 绑定微信
export const bindWechat = (userId) => {
  // 获取微信授权URL
  return axios.get(`/users/${userId}/wechat-auth-url`);
};

// 发送验证码
export const sendVerificationCode = (type, target) => {
  return axios.post('/users/send-verification-code', {
    type, // 'phone' 或 'email'
    target // 手机号或邮箱
  });
};

// 注销账号
export const deactivateAccount = (userId, verificationCode) => {
  return axios.post(`/users/${userId}/deactivate`, {
    verificationCode
  });
};
