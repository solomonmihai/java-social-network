import api from "./api";

export async function register(data) {
  return api.post("/api/auth/register", data);
}

export async function login(data) {
  try {
    const res = await api.post("/api/auth/login", data);

    if (res.status != 200) {
      return false;
    }

    return res.data;
  } catch (err) {
    console.log("error registering user", err);
    return false;
  }
}

export async function getOwnUserData() {
  return api.get("/api/user/me").then((res) => res.data);
}

export async function getUserData(id) {
  return api.get(`/api/user/${id}`).then((res) => res.data);
}

export async function createPost(data) {
  return api.post("/api/posts/new", data).then((res) => res.data);
}

export async function fetchPosts() {
  return api.get("/api/posts/all").then((res) => res.data);
}

export async function getUserPosts(userId) {
  return api.get(`/api/posts/user/${userId}`).then((res) => res.data);
}

export async function getPost(postId) {
  return api.get(`/api/posts/${postId}`).then((res) => res.data);
}

export async function votePost(data) {
  return api.post("/api/votes/vote", data).then((res) => res.data);
}

export async function getPostVoteScore(postId) {
  return api.get(`/api/votes/post/${postId}/score`).then((res) => res.data);
}

export async function deletePost(id) {
  return api.delete(`/api/posts/delete/${id}`).then((res) => res.data);
}

export async function getCommentsForPost(postId) {
  return api.get(`/api/comments/post/${postId}`).then((res) => res.data);
}

export async function getCommentCountForPost(postId) {
  return api.get(`/api/comments/post/${postId}/count`).then((res) => res.data);
}

export async function addNewComment(data) {
  return api.post("/api/comments/new", data).then((res) => res.data);
}

export async function deleteComment(commentId) {
  return api.delete(`/api/comments/delete/${commentId}`).then((res) => res.data);
}
