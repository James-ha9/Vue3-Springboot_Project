import axios from "./axios";

export const getForumList = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/posts/forum_list", {
      headers: {
        Authorization: `Bearer ${token}`, // 使用 Bearer Token 进行身份验证
      },
    });
    return res;
  } catch (e) {
    console.error("Error fetching forum list:", e.message);
  }
};
