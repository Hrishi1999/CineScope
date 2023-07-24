import NewsManagementService from "@/services/NewsManagementService/NewsManagementService";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const today = new Date();

export default function News() {
  const toast = useToast();
  const navigate = useNavigate();
  const newsManagementService = new NewsManagementService();
  const [allNews, setAllNews] = useState([] as any);


  const fetchNews = async () => {
    const body: any = await newsManagementService.fetchAllNews();
    if (body == null) {
      alert("Something went wrong loading latest News. Please try again.");
    } else {
      setAllNews(body);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);



  const onClick = (event: any) => {
    event.preventDefault();
    toast({
      title: "Subscribed",
      description: "You have subscribed to our newsletter successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };
  return (
    <>
      <Flex as="nav" justify="space-between" paddingBottom={"4"}>
        <Box>
          <Heading
            p={"10px"}
            fontFamily={"heading"}
            color="Silver"
            fontSize="5xl"
          >
            Top news
          </Heading>
        </Box>
        {/* <Box p={"30px"} display="flex" flexDirection={"row"}>
          <Button
            colorScheme={"yellow"}
            size="lg"
            variant="ghost"
            onClick={onClick}
          >
            Subscribe
          </Button>
        </Box> */}
      </Flex>
      <Spacer />
      <Flex pl="20px" pr={"20px"} display="flex" flexDirection={"column"}>
        {allNews.map((news: any) => (
          <Card m={2} onClick={() => navigate("/news-details/" + news._id)} cursor="pointer" padding={8}>
            <Heading
              fontSize={"3xl"}
              fontStyle="bold"
              textAlign="left"
              paddingBottom={"2"}
            >
              
                {news.newsTitle}
              
            </Heading>
            <Stack>
              <Image
                objectFit={"cover"}
                maxW={{ base: "100%", sm: "300px" }}
                src={news.posterLink}
                alt="image"
              />
            </Stack>
            <Stack>
              <CardBody>
                <Text py="2">
                  {news.fullArticle}
                </Text>
              </CardBody>

              <CardFooter>
                <Text>Published on: {today.toLocaleDateString()}</Text>
              </CardFooter>
            </Stack>
          </Card>
        
        ))}

      </Flex>
    </>
  );
}
