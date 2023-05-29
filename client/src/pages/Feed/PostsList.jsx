import { useEffect, useState } from "react";

import Post from "../../components/Post";

import { fetchPosts } from "../../services";
import FeedStore from "../../stores/feed";

export default function PostsList() {
  const reload = FeedStore.useState((state) => state.reload);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then((newPosts) => {
      setPosts(newPosts);
    });
  }, [reload]);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </>
  );
}
