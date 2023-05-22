import { useState, useEffect } from "react";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import { Box, Input, FormControl, FormLabel, Text, Button, FormErrorMessage, Link, useToast } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

import { register } from "../services";
import AuthStore from "../stores/auth";
import PasswordInput from "../components/PasswordInput";

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const token = AuthStore.useState((state) => state.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [inputState, setInputState] = useState("data");

  function handleChange(evt) {
    setErrors({});

    const { name } = evt.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: evt.target.value,
      };
    });
  }

  function onSubmit() {
    if (data.password.trim() != data.confirmPassword.trim()) {
      setErrors({ password: "passwords don't match" });
      return;
    }

    register(data)
      .then((res) => {
        AuthStore.update((state) => {
          state.token = res.token;
        });

        navigate("/");
      })
      .catch((err) => {
        if (!err.response) {
          toast({
            title: "there was an error creating your account",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          return;
        }
        setErrors(err.response.data.error);
        for (const [key, value] of Object.entries(err.response.data)) {
          if (key != "password" && value != null) {
            setInputState("data");
            break;
          }
        }
      });
  }

  function goToPassword() {
    if (data.firstName.trim() == "") {
      setErrors({ firstName: "field cannot be empty" });
      return;
    }
    if (data.lastName.trim() == "") {
      setErrors({ lastName: "field cannot be empty" });
      return;
    }
    if (data.email.trim() == "") {
      setErrors({ email: "field cannot be empty" });
      return;
    }
    setInputState("password");
  }

  // TODO: add animation to this box

  return (
    <Box w="100vw" h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box minW="350" p="4" borderRadius="md" borderWidth="1px">
        <Text fontWeight="bold" fontSize="2xl">
          {inputState == "data" ? "Register" : "Set password"}
        </Text>
        {inputState == "data" ? (
          <>
            <FormControl mt="4" isInvalid={errors.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="First Name" value={data.firstName} name="firstName" onChange={handleChange} />
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl my="4" isInvalid={errors.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Last Name" value={data.lastName} name="lastName" onChange={handleChange} />
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            </FormControl>
            <FormControl mb="4" isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" value={data.email} name="email" onChange={handleChange} />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
          </>
        ) : (
          <>
            <FormControl my="4" isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <PasswordInput value={data.password} name="password" onChange={handleChange} />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Confirm password</FormLabel>
              <PasswordInput value={data.confirmPassword} name="confirmPassword" onChange={handleChange} />
            </FormControl>
          </>
        )}
        {inputState == "data" ? (
          <Button w="full" rightIcon={<ArrowForwardIcon />} variant="outline" onClick={goToPassword}>
            Continue
          </Button>
        ) : (
          <Box display="flex">
            <Button flex="0.3" leftIcon={<ArrowBackIcon />} variant="outline" onClick={() => setInputState("data")}>
              Back
            </Button>
            <Button ml="4" flex="0.7" colorScheme="blue" onClick={onSubmit}>
              Create Account
            </Button>
          </Box>
        )}
        <Text fontSize="sm" mt="2">
          already have an account?{" "}
          <Link to="/login" as={ReactRouterLink} color="blue.200">
            login
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
