import { useNavigate, Link as ReactRouterLink } from "react-router-dom";

import {
  Box,
  HStack,
  Spacer,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Button,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon, AddIcon, BellIcon } from "@chakra-ui/icons";

import NewPostModal from "./NewPostModal";

import AuthStore from "../stores/auth";

export default function Navbar() {
  const userData = AuthStore.useState((state) => state.user);
  const navigate = useNavigate();

  const [NewPostModalComponent, openPostModal] = NewPostModal();

  if (!userData) {
    return <h1>Loading</h1>;
  }

  function logout() {
    AuthStore.update((state) => {
      state.token = null;
      state.user = null;
    });
    navigate("/login");
  }

  return (
    <Box position="sticky" top={0} zIndex="sticky" backgroundColor="gray.800" py="4" boxShadow="md">
      <HStack mt="2" mx="auto" maxW="container.md">
        <Button as={ReactRouterLink} to="/" variant="outline">
          Home
        </Button>
        <InputGroup width="md">
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder="search posts ..." />
        </InputGroup>
        <Spacer />
        <Tooltip label="create post">
          <IconButton icon={<AddIcon />} variant="outline" onClick={openPostModal} />
        </Tooltip>
        {NewPostModalComponent}
        <Tooltip label="notifications">
          <IconButton icon={<BellIcon />} variant="outline" />
        </Tooltip>
        <Menu>
          <MenuButton aria-label="Options" variant="outline" as={Button} leftIcon={<HamburgerIcon />}>
            {userData.firstName + " " + userData.lastName}
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to={`/user/${userData.id}`}>
              View profile
            </MenuItem>
            <MenuItem onClick={logout}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
}
