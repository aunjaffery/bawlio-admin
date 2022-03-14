import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Select,
} from "@chakra-ui/react";
import { useTable, usePagination } from "react-table";

const CustomerTable = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const tdStyle = {
    borderColor: "border.100",
    py: "6",
    fontSize: "sm",
    cursor: "pointer",
  };

  // Render the UI for your table
  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps()}
                  color="gray.800"
                  borderColor="border.100"
                  py="6"
                >
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} _hover={{ bg: "gray.200" }}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()} sx={tdStyle}>
                      <Text isTruncated maxW="280px" fontSize="sm">
                        {cell.render("Cell")}
                      </Text>
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex mt="4" justify="space-between" px="4">
        <Flex align="center" gridGap="2">
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            minW="70px"
            size="sm"
          >
            {[2, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
          <Box>
            <Text fontSize="sm" color="gray.500" minW="80px">
              per page
            </Text>
          </Box>
        </Flex>
        <Flex align="center">
          <Text mr="4" fontSize="sm" color="gray.600">
            Page {pageIndex + 1} of {pageOptions.length}
          </Text>
          <Button
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            borderColor="border.100"
            borderWidth="1px"
            borderRadius="none"
            bg="white"
            borderLeftRadius="md"
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => previousPage()}
            isDisabled={!canPreviousPage}
            borderColor="border.100"
            borderWidth="1px"
            borderRadius="none"
            bg="white"
          >
            {"<"}
          </Button>
          <Button
            onClick={() => nextPage()}
            isDisabled={!canNextPage}
            borderColor="border.100"
            borderWidth="1px"
            borderRadius="none"
            bg="white"
          >
            {">"}
          </Button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            isDisabled={!canNextPage}
            borderColor="border.100"
            borderWidth="1px"
            borderRadius="none"
            bg="white"
            borderRightRadius="md"
          >
            {">>"}
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
export default CustomerTable;
