import { useState, useEffect } from "react";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import { Box, Input, FormControl, FormLabel, Text, Button, Link } from "@chakra-ui/react";

import PasswordInput from "../components/PasswordInput";

import AuthStore from "../stores/auth";
import { login } from "../services";

export default function Login() {
  const navigate = useNavigate();

  const token = AuthStore.useState((state) => state.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name } = evt.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: evt.target.value,
      };
    });
  }

  function onSubmit() {
    // TODO: add event for incorrect password
    // TODO: maybe move this logic to services
    login(data)
      .then((res) => {
        AuthStore.update((state) => {
          state.token = res.token;
        });

        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <Box w="100vw" h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box minW="350" p="4" borderRadius="md" borderWidth="1px">
        <Text fontWeight="bold" fontSize="2xl">
          Login
        </Text>
        <FormControl mt="4">
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" value={data.email} name="email" onChange={handleChange} />
        </FormControl>
        <FormControl my="4">
          <FormLabel>Password</FormLabel>
          <PasswordInput placeholder="password" value={data.password} name="password" onChange={handleChange} />
        </FormControl>
        <Button w="full" colorScheme="blue" onClick={onSubmit}>
          Login
        </Button>
        <Text fontSize="sm" mt="2">
          don't have an account?{" "}
          <Link to="/register" as={ReactRouterLink} color="blue.200">
            register
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
