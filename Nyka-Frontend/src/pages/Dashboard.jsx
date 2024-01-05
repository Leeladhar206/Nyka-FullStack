import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import notificationBing from "../assets/notification-bing.svg";
import profile from "../assets/ProfileAvtar.svg";
import search from "../assets/search-normal.svg";
import rightArrow from "../assets/arrow-right.svg";
import sort from "../assets/Sort.svg";
import edit from "../assets/edit-3.svg";
import more from "../assets/more-horizontal.svg";
import trash from "../assets/trash-2.svg";
import { addProductFun, getProductsFun } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";
import AddProduct from "../components/AddProduct";

export const Dashboard = () => {
  const [searchInput, setSearchInput] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();

  const { products } = useSelector((store) => store.productReducer);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleGenderFilter = (value) => {
    setGenderFilter(value);
  };

  const handleCategoryFilter = (value) => {
    setCategoryFilter(value);
  };

  const handleSortOrder = (value) => {
    setSortOrder(value);
  };

  const handleAddProduct = (productData) => {
    console.log(productData);
    dispatch(addProductFun(productData));
    setRefresh(!refresh);
  };

  const filteredProducts = products
    .filter((ele) => {
      const lowerCaseSearch = searchInput.toLowerCase();
      const productName = ele.name.toLowerCase();

      return productName.includes(lowerCaseSearch);
    })
    .filter((ele) => !genderFilter || ele.gender === genderFilter)
    .filter((ele) => !categoryFilter || ele.category === categoryFilter)
    .sort((a, b) => {
      if (sortOrder === "Ascending") {
        return a.price - b.price;
      } else if (sortOrder === "Descending") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  useEffect(() => {
    dispatch(getProductsFun());
  }, [dispatch, refresh]);

  console.log("dom", filteredProducts);

  return (
    <Box boxSizing="border-box">
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"4.4%"}
        pl={10}
        pr={"8%"}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Image mt={3} ml={4} src={search} />}
          />
          <Input
            type="text"
            w="65%"
            h="52px"
            borderRadius="3px"
            border="1px solid rgba(0, 0, 0, 0.20)"
            bg="#FFF"
            pl={"6%"}
            color="#ADA7A7"
            fontSize={"16px"}
            placeholder="Search"
            value={searchInput}
            onChange={handleSearch}
          />
        </InputGroup>

        <Flex gap={5}>
          <Box
            w="52px"
            h="52px"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bg="#FFF"
          >
            <Image src={notificationBing} />
          </Box>
          <Box w="52px" h="52px">
            <Image src={profile} />
          </Box>
        </Flex>
      </Flex>

      <Flex
        w={"90%"}
        m={"auto"}
        mt={8}
        gap={5}
        justifyContent={"space-between"}
      >
        <Flex gap={10} w="100%" h="150px" mb={4}>
          <Select
            placeholder="Fliter By Gender"
            bg={"#fff"}
            w={"25%"}
            h={"52px"}
            borderRadius={"8px"}
            onChange={(e) => handleGenderFilter(e.target.value)}
          >
            <option value="male" style={{ height: "52px" }}>
              Male
            </option>
            <option value="female" style={{ height: "52px" }}>
              Female
            </option>
          </Select>
          <Select
            placeholder="Filter By Category"
            bg={"#fff"}
            w={"27%"}
            h={"52px"}
            borderRadius={"8px"}
            onChange={(e) => handleCategoryFilter(e.target.value)}
          >
            <option value="makeup">Makeup</option>
            <option value="skincare">Skincare</option>
            <option value="haircare">Haircare</option>
          </Select>

          <Select
            placeholder="Sort By Price"
            bg={"#fff"}
            w={"25%"}
            h={"52px"}
            borderRadius={"8px"}
            onChange={(e) => handleSortOrder(e.target.value)}
          >
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </Select>
        </Flex>

        <Flex w="25%" alignItems="flex-end">
          <Button
            onClick={() => setAddProductModalOpen(true)}
            bg={"#0E1866"}
            color={"#fff"}
            w="100%"
            fontWeight={800}
            h={"52px"}
          >
            {" "}
            Add Product
          </Button>
        </Flex>
      </Flex>

      <AddProduct
        isOpen={isAddProductModalOpen}
        onClose={() => setAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <Box
        w="94%"
        m="auto"
        mt={10}
        mb={5}
        h="830px"
        p={8}
        borderRadius="16px"
        background="#FFF"
        boxshadow="0px 8px 32px 0px rgba(51, 38, 174, 0.08)"
      >
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"20px"} fontWeight={500} color={"#1C2A53"}>
            Latest Orders
          </Text>

          <Box display={"flex"} gap={3}>
            <Text fontSize={"14px"} fontWeight={600} color={"#555F7E"}>
              More
            </Text>
            <Image mt={-2} src={rightArrow} />
          </Box>
        </Flex>

        <Flex
          h="64px"
          bg="#F8F8F8"
          borderBottom={"2px solid #E9EAF3"}
          fontSize="14px"
          m="auto"
          mt="32px"
          justifyContent={"space-between"}
          alignItems={"center"}
          color="#8E95A9"
        >
          <Box w="29%" ml={10}>
            Products
          </Box>
          <Box w="10%" display={"flex"}>
            Gender
            <Image ml={2} src={sort} />
          </Box>
          <Box w="14%" display={"flex"}>
            Category
            <Image ml={2} src={sort} />
          </Box>
          <Box w="10%" display={"flex"}>
            Price
            <Image ml={2} src={sort} />
          </Box>
          <Box w="27%" display={"flex"} ml={10}>
            Description
            <Image ml={2} src={sort} />
          </Box>
          <Box w="10%">Actions</Box>
        </Flex>

        {filteredProducts.length > 0 &&
          filteredProducts.map((el) => {
            return (
              <Flex
                h="64px"
                bg="#FFF"
                borderBottom={"2px solid #E9EAF3"}
                fontSize="14px"
                m="auto"
                justifyContent={"space-between"}
                alignItems={"center"}
                color="#8E95A9"
                key={el._id}
              >
                <Box
                  w="29%"
                  display={"flex"}
                  gap={4}
                  alignItems={"center"}
                  ml={6}
                >
                  <Image ml={2} src={el.picture} />
                  {el.name}
                </Box>
                <Box w="10%" ml={4}>
                  {el.gender}
                </Box>
                <Box w="14%" ml={4}>
                  {el.category}
                </Box>
                <Box w="10%" ml={-2}>{`$ ${el.price}`}</Box>
                <Box w="23%" ml={10} fontSize={"12px"}>
                  {el.description}
                </Box>
                <Box w="14%" display={"flex"} justifyContent={"space-evenly"}>
                  <Image src={edit} />
                  <Image src={trash} />
                  <Image src={more} />
                </Box>
              </Flex>
            );
          })}
      </Box>
    </Box>
  );
};
