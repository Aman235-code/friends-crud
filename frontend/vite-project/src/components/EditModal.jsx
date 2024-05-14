import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

function EditModal({ user, setUsers }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setisloading] = useState(false);
  const toast = useToast();
  const [inputs, setinputs] = useState({
    name: user.name,
    role: user.role,
    description: user.description,
  });

  const handleEditUser = async (e) => {
    e.preventDefault();
    setisloading(true);
    try {
      const res = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prev) => prev.map((u) => (u.id === user.id ? data : u)));
      toast({
        title: "Congratulations",
        description: "Friend Updated Successfully.",
        position: "top-center",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error Occured.",
        description: error.message,
        position: "top-center",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setisloading(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="ghost"
        colorScheme="blue"
        aria-label="See menu"
        size={"sm"}
        icon={<BiEditAlt size={20} />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleEditUser}>
          <ModalContent>
            <ModalHeader>My new BFF 😍</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="John Doe"
                    value={inputs.name}
                    onChange={(e) =>
                      setinputs({ ...inputs, name: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Software Engineer"
                    value={inputs.role}
                    onChange={(e) =>
                      setinputs({ ...inputs, role: e.target.value })
                    }
                  />
                </FormControl>
              </Flex>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="He's a software engineer who loves to code and build things.
              "
                  value={inputs.description}
                  onChange={(e) =>
                    setinputs({ ...inputs, description: e.target.value })
                  }
                />
              </FormControl>
              {/* <RadioGroup defaultValue="male" mt={4}>
              <Flex gap={5}>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Flex>
            </RadioGroup> */}
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                type="submit"
                isloading={isloading}
                mr={3}
              >
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;

// import {
//     Button,
//     Flex,
//     FormControl,
//     FormLabel,
//     IconButton,
//     Input,
//     Modal,
//     ModalBody,
//     ModalCloseButton,
//     ModalContent,
//     ModalFooter,
//     ModalHeader,
//     ModalOverlay,
//     Textarea,
//     useDisclosure,
//     useToast,
//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import { BiEditAlt } from "react-icons/bi";
//   import { BASE_URL } from "../App";
import { useState } from "react";
import { BASE_URL } from "./../App";

//   function EditModal({ setUsers, user }) {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const [isLoading, setIsLoading] = useState(false);
//     const [inputs, setInputs] = useState({
//       name: user.name,
//       role: user.role,
//       description: user.description,
//     });
//     const toast = useToast();

//     const handleEditUser = async (e) => {
//       e.preventDefault();
//       setIsLoading(true);
//       try {
//         const res = await fetch(BASE_URL + "/friends/" + user.id, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(inputs),
//         });
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.error);
//         }
//         setUsers((prevUsers) =>
//           prevUsers.map((u) => (u.id === user.id ? data : u))
//         );
//         toast({
//           status: "success",
//           title: "Yayy! 🎉",
//           description: "Friend updated successfully.",
//           duration: 2000,
//           position: "top-center",
//         });
//         onClose();
//       } catch (error) {
//         toast({
//           status: "error",
//           title: "An error occurred.",
//           description: error.message,
//           duration: 4000,
//           position: "top-center",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     return (
//       <>
//         <IconButton
//           onClick={onOpen}
//           variant="ghost"
//           colorScheme="blue"
//           aria-label="See menu"
//           size={"sm"}
//           icon={<BiEditAlt size={20} />}
//         />

//         <Modal isOpen={isOpen} onClose={onClose}>
//           <ModalOverlay />
//           <form onSubmit={handleEditUser}>
//             <ModalContent>
//               <ModalHeader>My new BFF 😍</ModalHeader>
//               <ModalCloseButton />
//               <ModalBody pb={6}>
//                 <Flex alignItems={"center"} gap={4}>
//                   <FormControl>
//                     <FormLabel>Full Name</FormLabel>
//                     <Input
//                       placeholder="John Doe"
//                       value={inputs.name}
//                       onChange={(e) =>
//                         setInputs((prev) => ({ ...prev, name: e.target.value }))
//                       }
//                     />
//                   </FormControl>

//                   <FormControl>
//                     <FormLabel>Role</FormLabel>
//                     <Input
//                       placeholder="Software Engineer"
//                       value={inputs.role}
//                       onChange={(e) =>
//                         setInputs((prev) => ({ ...prev, role: e.target.value }))
//                       }
//                     />
//                   </FormControl>
//                 </Flex>
//                 <FormControl mt={4}>
//                   <FormLabel>Description</FormLabel>
//                   <Textarea
//                     resize={"none"}
//                     overflowY={"hidden"}
//                     placeholder="He's a software engineer who loves to code and build things."
//                     value={inputs.description}
//                     onChange={(e) =>
//                       setInputs((prev) => ({
//                         ...prev,
//                         description: e.target.value,
//                       }))
//                     }
//                   />
//                 </FormControl>
//               </ModalBody>

//               <ModalFooter>
//                 <Button
//                   colorScheme="blue"
//                   mr={3}
//                   type="submit"
//                   isLoading={isLoading}
//                 >
//                   Update
//                 </Button>
//                 <Button onClick={onClose}>Cancel</Button>
//               </ModalFooter>
//             </ModalContent>
//           </form>
//         </Modal>
//       </>
//     );
//   }

//   export default EditModal;
