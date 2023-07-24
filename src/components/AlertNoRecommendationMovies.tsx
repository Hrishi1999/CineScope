import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
  } from "@chakra-ui/react";

export const AlertNoRecommendationMovies = () => {
    // Reference: https://chakra-ui.com/docs/components/alert
    return(
        <Box as="section" w="70%" marginBottom={5} marginLeft={5} marginRight={5} p={5}>
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
            No movies found in your watchlist!!!
        </AlertTitle>
        <AlertDescription maxWidth="2xl">
            Please add movies to your watchlist to get recommedation movies.
        </AlertDescription>
        </Alert>
    </Box>
    )
}