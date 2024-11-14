import instance from '@/api/axios';

// 获取所有旧物列表
export const getUsedItems = async (page = 1, pageSize = 12) => {
  try {
    const response = await instance({
      url: '/used-items',
      method: 'get',
      params: {
        page,
        pageSize
      }
    });
    
    // 打印API响应
    console.log('Used items API response:', response);
    
    return response;
  } catch (error) {
    console.error('Get used items error:', error);
    throw error;
  }
};

// 提交旧物信息
export const submitUsedItem = (data) => {
  return instance({
    url: '/used-items',
    method: 'post',
    data
  });
};

// 创建旧物项目
export const createUsedItem = (data) => {
  return instance({
    url: '/used-items',
    method: 'post',
    data
  });
};

// 上传旧物图片
export const uploadUsedItemImage = (itemId, formData) => {
  return instance({
    url: `/used-items/${itemId}/images`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// 获取旧物图片
export const getUsedItemImage = (itemId) => {
  return instance({
    url: `/used-items/${itemId}/images`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}; 