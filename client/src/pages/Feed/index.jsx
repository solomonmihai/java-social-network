import { Heading } from "@chakra-ui/react";

import PostsList from "./PostsList";

export default function Feed() {
  return (
    <>
      <Heading size="lg">Feed</Heading>
      <PostsList />
    </>
  );
}
