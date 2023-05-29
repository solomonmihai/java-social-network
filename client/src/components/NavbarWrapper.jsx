import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import Navbar from "./Navbar";

export default function NavbarWrapper() {
  return (
    <>
      <Navbar />
      <Container maxW="container.md" m="2" mx="auto" mt="4" p="0">
        <Outlet />
      </Container>
    </>
  );
}
