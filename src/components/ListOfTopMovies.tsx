/**
 * @author Ketul Patel - <ketul.patel@dal.ca>
 */

import { useState } from 'react';
import { useToast , Button, Text, Box, Heading, List, ListItem, Image, Flex, HStack, Spacer } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,AlertDialogContent, AlertDialogOverlay} from '@chakra-ui/react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ListOfTopMovies() {


    
    const [topMovies, setTopMovies] = useState<any>([]);

    const [isOpen, setIsOpen] = useState<any>(false);
    const [deleteId, setDeleteID] = useState<any>();
    const [deleteMovieTitle, setDeleteMovieTitle] = useState<string>('');
    const toast = useToast()
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    const onDeleteIcon = async (id: any, title: string) => {
        setIsOpen(true)
        setDeleteID(id)
        setDeleteMovieTitle(title)
    }
    const onEditIcon = async (id: number) => {
        navigate(`/update-movie-details/${id}`)
    }

    const onClickDelete = async(id: any) => {
        
        setIsOpen(false)

        for (let i = 0; i < topMovies.length; i++) {
            let movie_id = topMovies[i].id;
            
            if(movie_id == id.deleteId){
                topMovies.splice(i,1);
                setTopMovies(topMovies)
                toast({
                    title: `Movie deleted sucessfully.`,
                    status: 'success',
                    isClosable: true,
                  })
            }
        
        }
          
        
        
    }


  return (
    <div>
      <Box pt={[3, 5, 7]} mt={[3, 5, 10]}>
            
            <Heading as="h2" size="lg" textColor="black" p="10px" mt="15">
                Top Movies
            </Heading>

            <List styleType="none" pt="20px" >
                <Flex justifyContent="space-around" wrap="wrap">
                    {topMovies.map((topMovie: any) => (
                    
                    <ListItem key={topMovie.id} boxSize={['50px','150px','175px']}>
                        
                        <Image src={topMovie.poster} alt='Film' boxSize='200px' />
                        <Text fontWeight="bold" fontSize="20px">{topMovie.title}</Text>
                        <HStack alignItems="center">
                            <Text color="gray.500" fontSize="20px">({topMovie.year})</Text>
                            <Spacer></Spacer>
                            <EditIcon boxSize={[1,3,5]} onClick={() => {onEditIcon(topMovie.id)}} color="green.500"></EditIcon>
                            <DeleteIcon boxSize={[1,3,5]} onClick={() => {onDeleteIcon(topMovie.id, topMovie.title)}}  color="red.500"></DeleteIcon>
                        </HStack>
                        
                        
                     </ListItem>
                     
                ))}
                </Flex>
            </List>
            
        </Box>
        <AlertDialog
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              leastDestructiveRef={cancelRef}                 >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Movie
                        </AlertDialogHeader>
            
                        <AlertDialogBody>
                            Do you really want to delete movie <b>{deleteMovieTitle}</b>? You can't undo this action afterwards.
                        </AlertDialogBody>
            
                        <AlertDialogFooter>
                            <Button onClick={() => setIsOpen(false)}>
                            Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => onClickDelete({deleteId})} ml={3}>
                            Delete
                            </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                    </AlertDialog>
    </div>
  )
}
