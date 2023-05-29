import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "../../components/Post";

import { getPost } from "../../services";

export default function PostPage() {
  const { postId } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    getPost(postId).then((res) => setData(res));
  }, []);

  if (!data) {
    return <p>loading ...</p>;
  }

  return <Post data={data} extended={true} />;
}
