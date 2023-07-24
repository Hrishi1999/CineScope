import { SessionManager } from "@/common/SessionManager";
import AddGuideDialog from "@/components/AddGuideDialog";
import MovieManagementService from "@/services/MovieManagementService/MovieManagementService";
import { Card } from "@chakra-ui/card";
import { Badge, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Button, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams } from "react-router";
const ParentsGuide: React.FC = () => {
  const { id } = useParams();

  const [guides, setGuides] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const movieManagementService = new MovieManagementService();

  useEffect(() => {
    const getGuides = async () => {
      const body = await movieManagementService.fetchGuidesByMovieID(id);
      setGuides(body);
    };

    getGuides();
  }, []);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Mild":
        return <Badge colorScheme="green">{severity.toUpperCase()}</Badge>;
      case "Moderate":
        return <Badge colorScheme="yellow">{severity.toUpperCase()}</Badge>;
      case "Severe":
        return <Badge colorScheme="red">{severity.toUpperCase()}</Badge>;
      default:
        return <Badge colorScheme="gray">{severity.toUpperCase()}</Badge>;
    }
  };

  const addGuide = () => {
    onOpen();
  };

  const deleteGuide = async (guideId: string) => {
    await movieManagementService.deleteGuide(guideId);
    const body = await movieManagementService.fetchGuidesByMovieID(id);
    setGuides(body);
  };

  return (
    <Flex
      p={8}
      justifyContent={"left"}
      h={"100%"}
      w="100%"
      direction={"column"}
    >
      <HStack justifyContent={"space-between"}>
        <Heading>Parents Guide</Heading>
        <Button colorScheme="yellow" onClick={addGuide}>
          Add Guide
        </Button>
      </HStack>
      <VStack p={4} pt={12} w="100%">
        <VStack w="100%" alignItems={"center"}>
          {(guides ?? 0).length === 0 && (
            <Text>No guides found for this movie</Text>
          )}
          {guides.map((guide: any) => (
            <Card
              key={guide.id}
              w={"70%"}
              p={"10px"}
              m={"10px"}
              boxShadow={"md"}
            >
              <HStack justifyContent={"space-between"}>
                <Text>{guide.comment}</Text>
                {guide.userId === SessionManager.getUserID() && (
                  <IconButton
                    onClick={() => deleteGuide(guide._id)}
                    icon={<AiOutlineDelete />}
                    aria-label="Delete Guide"
                  />
                )}
              </HStack>
              <HStack>
                <Text>Severity: </Text>
                {getSeverityBadge(guide.severity)}
                <Text>Category: </Text>
                <Badge colorScheme="blue">{guide.category.toUpperCase()}</Badge>
              </HStack>
            </Card>
          ))}
        </VStack>
      </VStack>
      <AddGuideDialog isOpen={isOpen} onClose={onClose} movieId={id ?? ""} />
    </Flex>
  );
};

export default ParentsGuide;
