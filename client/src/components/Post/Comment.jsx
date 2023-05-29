import { Box, Text } from "@chakra-ui/react";

import dayjs from "dayjs";

import UserName from "./UserName";

export default function Comment({ data }) {
  return (
    <Box borderWidth="0px" p="0" borderRadius="md" fontSize="sm" mt="4">
      <UserName user={data.user} />{" "}
      <Text as="span" fontSize="small" color="gray.500">
        {dayjs(data.date).fromNow()}
      </Text>
      <Text> {data.content}</Text>
    </Box>
  );
}
