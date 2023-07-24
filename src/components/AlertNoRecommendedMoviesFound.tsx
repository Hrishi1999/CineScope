import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
  } from "@chakra-ui/react";

export const AlertNoRecommendedMoviesFound = () => {
    // Reference: https://chakra-ui.com/docs/components/alert
    return(
        <Box as="section" w="70%" marginBottom={5} marginLeft={5} marginRight={5}>
        <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
            No movies found!!!
        </AlertTitle>
        <AlertDescription maxWidth="2xl">
            No movies found to be recommended to your for the current movie.
        </AlertDescription>
        </Alert>
    </Box>
    )
}