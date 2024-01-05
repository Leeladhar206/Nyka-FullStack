
import { Box, Flex } from "@chakra-ui/react";
import { AllRoutes } from "./components/AllRoutes";
import { Sidebar } from "./components/Sidebar";


function App() {
  const newFont = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600;700&family=Lexend:wght@400;500;600;700;800&family=Outfit:wght@400;600;800&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">`;

  return (
    <Box w="100%" fontFamily="Poppins, sans-serif" display={"Flex"} bg="#F8F8F8"  boxSizing="border-box">
      <Box dangerouslySetInnerHTML={{ __html: newFont }} />
       <Sidebar />
       <Flex direction="column" w="84%">
        <AllRoutes />
      </Flex>
    </Box>
  );
}

export default App;
