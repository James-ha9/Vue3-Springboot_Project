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
  return axios.put(`/users/${userId}/settings`, settings);
};

// 获取用户资料
export const getUserProfile = async (userId) => {
  return axios.get(`/users/${userId}/profile`);
};

// 更新用户资料
export const updateUserProfile = async (userId, profileData) => {
  return axios.put(`/users/${userId}/profile`, profileData);
};

// 获取账户设置
export const getAccountSettings = async (userId) => {
  return axios.get(`/users/${userId}/settings`);
};

// 发送验证码 - 只发送 email
export const sendVerificationCode = (type, target) => {
  return axios.post('/users/reset-password', {
    email: target
  });
};

// 重置密码
export const resetPassword = (email, verificationCode, newPassword) => {
  return axios.post('/users/confirm-reset-password', {
    email,
    verificationCode,
    newPassword
  });
};

// 注销账号
export const deactivateAccount = (userId, verificationCode) => {
  return axios.post(`/users/${userId}/deactivate`, {
    verificationCode
  });
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
  return axios.get(`/users/${userId}/wechat-auth-url`);
};
