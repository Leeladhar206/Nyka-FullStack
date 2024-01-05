import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const initialState = {
  name: "",
  description: "",
  category: "skincare",
  gender: "male",
  price: "",
  picture: "",
};

const AddProduct = ({ isOpen, onClose, onAddProduct }) => {
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextStep = (i) => {
    setStep(i);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const handleAddProduct = () => {
    onAddProduct(productData);
    onClose();
    setProductData(initialState);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product - Step {step}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {step === 1 && (
            <>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  value={productData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </FormControl>
            </>
          )}

          {step === 2 && (
            <>
              <FormControl mb={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Picture</FormLabel>
                <Input
                  type="text"
                  name="picture"
                  value={productData.picture}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                >
                  <option value="skincare">skincare</option>
                  <option value="haircare">haircare</option>
                  <option value="makeup">makeup</option>
                </Select>
              </FormControl>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          {step === 1 && (
            <Button colorScheme="blue" mr={3} onClick={() => handleNextStep(2)}>
              Next
            </Button>
          )}

          {step === 2 && (
            <>
              <Button onClick={() => handleNextStep(1)}>Previous</Button>
              <Button colorScheme="blue" mr={3} onClick={handleAddProduct}>
                Add Product
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProduct;
