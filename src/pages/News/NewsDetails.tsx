import NewsManagementService from "@/services/NewsManagementService/NewsManagementService";
import {
    Box, Card, CardBody, Flex,
    Heading,
    HStack,
    Icon,
    Image, Stack, Text, useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";

const today = new Date();

export default function NewsDetails() {

    const { id } = useParams();
    console.log(id);

    const [news, setNews] = useState({} as any);
    const toast = useToast();

    useEffect(() => {
        const getNews = async () => {
            const newsManagementService = new NewsManagementService();
            const body: any = await newsManagementService.fetchNewsByID(id);
            if (body == null) {
                toast({
                    title: "Error",
                    description: "Something went wrong. Please try again later.",
                    status: "error",
                    duration: 3500,
                    isClosable: true,
                })
            } else {
                setNews(body);
            }
        }

        getNews();
    }, []);


    return (

        <><Flex
            pl="20px"
            pr={"20px"}
            display="flex"
            flexDirection={"column"}
        >

            <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={{ base: 'transparent', sm: 'bg-surface' }}
                boxShadow={{ base: 'none', sm: 'md' }}
                borderRadius={{ base: 'none', sm: 'xl' }}
                {...{ mt: "10px" }}>
                <Card>
                    <Heading
                        fontSize={"3xl"}
                        fontStyle="bold"
                        textAlign="left"
                        paddingBottom={"2"}>
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
                    </Stack>
                </Card>
            </Box>
        </Flex>
            <Flex
                pt={"10"}
                paddingBottom={"10"}
                display="flex"
                flexDirection={"column"}
                alignItems="end"
            >
                {/* <HStack>
                    <Text>
                        Share:
                    </Text>
                    <Icon as={FaFacebookSquare} boxSize={6} />
                    <Icon as={FaInstagram} boxSize={6} />
                    <Icon as={FaWhatsapp} boxSize={6} />
                </HStack> */}

            </Flex></>

    );
}