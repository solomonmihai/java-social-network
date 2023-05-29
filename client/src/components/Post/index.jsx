import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  IconButton,
  HStack,
  VStack,
  Spacer,
  Input,
  Button,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, SettingsIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";

import dayjs from "dayjs";

import FeedStore from "../../stores/feed";
import AuthStore from "../../stores/auth";

import {
  addNewComment,
  deletePost,
  getCommentCountForPost,
  getCommentsForPost,
  getPostVoteScore,
  votePost,
} from "../../services";
import Comment from "./Comment";
import UserName from "./UserName";

export default function Post({ data, extended = false }) {
  const userId = AuthStore.useState((state) => state.user.id);
  const reload = FeedStore.useState((state) => state.reload);

  const [postScore, setPostScore] = useState({});
  const [commentCount, setCommentCount] = useState(null);
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");

  useEffect(() => {
    getPostVoteScore(data.id).then((res) => {
      setPostScore(res);
    });

    getCommentCountForPost(data.id).then((res) => {
      setCommentCount(res);
    });

    if (!extended) {
      return;
    }

    getCommentsForPost(data.id).then((res) => {
      setComments(res);
    });
  }, [reload, extended]);

  function submitVotePost(vote) {
    votePost({
      postId: data.id,
      voteType: vote,
    }).then((res) => {
      setPostScore(res);
    });
  }

  function submitDeletePost() {
    deletePost(data.id).then(() => {
      FeedStore.update((state) => {
        state.reload = Math.random();
      });
    });
  }

  function submitComment() {
    addNewComment({
      post: data,
      content: comment,
    }).then((res) => {
      setComments(res);
      setComment("");
    });
  }

  return (
    <Box p="4" my="8" borderWidth="1px" borderRadius="md">
      <HStack>
        <Box>
          <Heading
            size="md"
            as={ReactRouterLink}
            to={`/post/${data.id}`}
            _hover={{
              textDecoration: "underline",
            }}
          >
            {data.title}
          </Heading>
          <Text fontSize="sm">
            <UserName user={data.user} />{" "}
            <Text as="span" color="gray.500">
              {dayjs(data.date).fromNow()}
            </Text>
          </Text>
        </Box>
        <Spacer />
        {data.user.id == userId && (
          <Menu>
            <MenuButton
              aria-label="Options"
              as={IconButton}
              icon={<SettingsIcon />}
              color="gray.600"
              _hover={{
                color: "gray.200",
              }}
              variant="unstyled"
              alignSelf="flex-start"
            />
            <MenuList>
              <MenuItem icon={<DeleteIcon />} onClick={submitDeletePost} color="red.200">
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
      <Box my="2">
        <Text whiteSpace="pre-line">{data.content}</Text>
      </Box>
      <HStack fontSize="sm">
        <Text
          color="gray.500"
          fontSize="sm"
          as={ReactRouterLink}
          to={`/post/${data.id}`}
          _hover={{
            textDecoration: "underline",
          }}
        >
          {commentCount} comment{commentCount != 1 && "s"}
        </Text>
        <Spacer />
        <HStack spacing="0">
          <Text mr="2">{postScore?.score}</Text>
          <IconButton
            variant={postScore.ownVote == "UP" ? "outline" : "ghost"}
            size="sm"
            icon={<ArrowUpIcon color={postScore.ownVote == "UP" && "blue.200"} />}
            onClick={() => submitVotePost("UP")}
          />
          <IconButton
            variant={postScore.ownVote == "DOWN" ? "outline" : "ghost"}
            size="sm"
            icon={<ArrowDownIcon color={postScore.ownVote == "DOWN" && "blue.200"} />}
            onClick={() => submitVotePost("DOWN")}
          />
        </HStack>
      </HStack>
      {extended && (
        <VStack mt="4" w="full">
          <HStack w="full">
            <Input placeholder="comment ..." value={comment} onChange={(evt) => setComment(evt.target.value)} />
            <Button variant="outline" onClick={submitComment}>
              Comment
            </Button>
          </HStack>
          <Box w="full">
            {comments.map((comment) => (
              <Comment key={comment.id} data={comment} />
            ))}
          </Box>
        </VStack>
      )}
    </Box>
  );
}
