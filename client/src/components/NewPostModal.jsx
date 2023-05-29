import { useState } from "react";
import {
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { createPost } from "../services";
import FeedStore from "../stores/feed";

export default function NewPostModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function newPost() {
    createPost({ title, content })
      .then(() => {
        setTitle("");
        setContent("");
        onClose();

        FeedStore.update((state) => {
          state.reload = Math.random();
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "there was an error creating your post",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }

  const ModalComponent = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New post</ModalHeader>
        <ModalBody>
          <FormControl mb="2">
            <FormLabel>Title</FormLabel>
            <Input placeholder="Title" value={title} onChange={(evt) => setTitle(evt.target.value)} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Textarea placeholder="Content" value={content} onChange={(evt) => setContent(evt.target.value)} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={newPost}>
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return [ModalComponent, onOpen];
}
