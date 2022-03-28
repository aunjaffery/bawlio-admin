import { Box, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { getAllContacts } from "@services/ContactApi";
import ContactTable from "@components/tables/ContactTable";
import { useQuery } from "react-query";
import PageTitle from "@components/common/PageTitle";
import { useMemo } from "react";
import moment from "moment";

const ContactList = () => {
  const {
    isLoading,
    data: contactData,
    error,
  } = useQuery("getAllContacts", getAllContacts);

  console.log(isLoading);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: (props) => (
          <Box>
            <Text color="green.500">
              {moment(props.value).format("h:mmA DD-MM-YY")}
            </Text>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Box bg="white" mb="16">
      <Container maxW="container.xl">
        {isLoading ? (
          <Flex minH="500px" justify="center" align="center">
            <Spinner size="lg" />
          </Flex>
        ) : (
          <Box>
            <PageTitle title="Contacts" />
            <Box bg="gray.100" borderRadius="lg" pb="6">
              <ContactTable columns={columns} data={contactData} />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ContactList;
