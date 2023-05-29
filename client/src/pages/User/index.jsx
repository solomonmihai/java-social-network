import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

import Post from "../../components/Post";

import { getUserData, getUserPosts } from "../../services";

export default function UserPage() {
  const { userId } = useParams();

  const [userData, setUserData] = useState();
  const [posts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserData(userId).then((res) => setUserData(res));

    getUserPosts(userId).then((res) => setUserPosts(res));
  }, [userId]);

  if (!userData) {
    return <p>loading ...</p>;
  }
  return (
    <>
      <Heading size="lg">{userData.firstName + " " + userData.lastName}</Heading>

      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </>
  );
}
