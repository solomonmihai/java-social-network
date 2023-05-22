import {
  HStack,
  Spacer,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

export default function Navbar() {
  return (
    <HStack>
      <Spacer />
      <InputGroup width="lg">
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input placeholder="search posts ..." />
      </InputGroup>
      <Spacer />
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
        <MenuList>
          <MenuItem>Log out</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
