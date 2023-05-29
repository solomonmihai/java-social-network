import { Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function UserName({ user }) {
  return (
    <Link as={ReactRouterLink} to={`/user/${user.id}`} color="blue.200">
      {user.firstName + " " + user.lastName}
    </Link>
  );
}
