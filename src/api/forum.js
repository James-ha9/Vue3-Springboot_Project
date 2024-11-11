import request from './axios'

export function getForumList(pageNum = 1, pageSize = 10) {
  return request({
    url: '/posts/forum_list',
    method: 'get',
    params: {
      pageNum,
      pageSize
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}