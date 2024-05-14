import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../App";
import UserCard from "./UserCard";

const UserGrid = ({ users, setUsers }) => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(BASE_URL + "/friends");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers} />
        ))}
      </Grid>

      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!loading && users.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text fontSize={"xl"}>
            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
              Poor You
            </Text>
            No Friends Found
          </Text>
        </Flex>
      )}
    </>
  );
};

export default UserGrid;
