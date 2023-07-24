# CineScope

Cinescope is an online platform which requires internet connection. So, anyone with internet connection can access it. Individual needs basic computer literacy skills and should be familiar with IMDB type website. No additional training is required for normal users to access this website. Users need to create account to access some features of the website. Additionally, user must be above 18 years to access Clubs feature of CineScope as it needs parental guidance. Also, Administrator is given with access for movie management, user management and comment moderation. So, administrator requires proper training to add, remove and update movies. Also, administrator should be able to distinguish the improper comments to delete it and also identify improper user to ban.

* *Date Created*: 28 Feb 2023
* *Last Modification Date*: 28 Feb 2023
* *Git URL*: https://git.cs.dal.ca/priyalp/group_3_csci5709
* *Live Project URL*: https://cinescope.netlify.app

## Authors

* [Shreya Jayachandran](sh466720@dal.ca) - *(Full Stack Developer)*
* [Hrishi Patel](hrishi.patel@dal.ca) - *(Full Stack Developer)*
* [Shubham Patel](shubham.patel@dal.ca) - *(Full Stack Developer)*
* [Harsh Shah](shah.harsh@dal.ca) - *(Full Stack Developer)*
* [Priyal Patel](pr327862@dal.ca) - *(Full Stack Developer)*
* [Ketul Patel](<ketul.patel@dal.ca>) - *(Full Stack Developer)*

## Getting Started

See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this lab / assingnment / project up and running on your local machine, you will first need to install the following software / libraries / plug-ins

```
Node.js
```

### Installing

To install Node.js, head to the following website: https://nodejs.org/en/ to download and install the Node.js runtime. Once you are done installing, validate the install by running the following command.

```
node --version
```

You should see the Node.js version you installed.

Once you have verified your Node.js setup, simply run the following command in the respository directory:

```
npm i
```

To start the development server and check out the website locally, run:

```
npm start
```

To create a production-ready build, run:

```
npm run build
```

## Deployment

To deploy this application, Netlify was used. You can follow the Tutorial 2 Netlify guide for deployment steps.

## Built With

- [React.js](https://reactjs.org/) - JavaScript library to create interactive UIs
- [Vite](https://vitejs.dev/) - Vite is a frontend build tool which enables fast and efficient development
- [Chakra UI](https://chakra-ui.com/) - A component library for React.js apps.
- [TypeScript](https://www.typescriptlang.org/) - Strongly-typed typesafe langauge (superset of JS).

## Sources Used

### UpdateMovieDetails.tsx | Ketul Patel

*Lines 201 - 209*

```
<FormControl isInvalid={!!formErrors?.get("title")}>
                <FormLabel htmlFor="title">Movie Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                />

```

The code above was created by adapting the code in [ChakraUI](https://chakra-ui.com/getting-started/with-hook-form) as shown below: 

```
<FormLabel htmlFor='name'>First name</FormLabel>
        <Input
          id='name'
          placeholder='name'
          {...register('name', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>

```

- <!---How---> The code in [ChakraUI](https://chakra-ui.com/getting-started/with-hook-form) was implemented by author.
- <!---Why---> [ChakraUI](https://chakra-ui.com/getting-started/with-hook-form)'s Code was used because I wanted to provide form validation and errors for the constraints.
- <!---How---> [ChakraUI](https://chakra-ui.com/getting-started/with-hook-form)'s Code was modified by changing the required elements and type of errors I wanted according to validations needed.


### ListOfTopMovies.tsx | Ketul Patel

*Lines 40 - 44*

```
toast({
                    title: `Movie deleted sucessfully.`,
                    status: 'success',
                    isClosable: true,
                  })

```

The code above was created by adapting the code in [ChakraUI](https://chakra-ui.com/docs/components/toast) as shown below: 

```
toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

```

- <!---How---> The code in [ChakraUI](https://chakra-ui.com/docs/components/toast) was provided in the official documentation.
- <!---Why---> [ChakraUI](https://chakra-ui.com/docs/components/toast)'s Code was  was used because I wanted to provide toast message as success.
- <!---How---> [ChakraUI](https://chakra-ui.com/docs/components/toast)'s Code was modified by changing toast message according to requirement.


### ListOfNewMovies.tsx | Ketul Patel

*Lines 38 - 42*

```
toast({
                    title: `Movie deleted sucessfully.`,
                    status: 'success',
                    isClosable: true,
                  })

```

The code above was created by adapting the code in [ChakraUI](https://chakra-ui.com/docs/components/toast) as shown below: 

```
toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

```

- <!---How---> The code in [ChakraUI](https://chakra-ui.com/docs/components/toast) was provided in the official documentation.
- <!---Why---> [ChakraUI](https://chakra-ui.com/docs/components/toast)'s Code was  was used because I wanted to provide toast message as success.
- <!---How---> [ChakraUI](https://chakra-ui.com/docs/components/toast)'s Code was modified by changing toast message according to requirement.


### FilterResults.tsx

*Lines 15 - 21*

```
const searchMovies = () => {
        const filteredMovies =  MovieDetails.filter(
          (movie) => {
            return movie.title.toLowerCase().includes(newKeyword.toLowerCase());
          });
          setAfterFilteration(filteredMovies);
    }
```
The code above was created by adapting the code of [Shashank Singh](https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58#:~:text=Firstly%2C%20we%20import%20useState%20from) as shown below: 

```
const filteredPersons = details.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        person
        .email
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );
```

- I took the reference from the code written by [Shashank Singh](https://medium.com/@singhshashank) to implement standard search functionality.
- [Shashank Singh](https://medium.com/@singhshashank)'s code was used because I wanted to implement Search functionality.
- [Shashank Singh](https://medium.com/@singhshashank)'s code was modified by changing parameters for filtering according to requirement.


## Acknowledgments

- [1] Hrishi Patel, “Tutorial 3, README.md”. [Online]. Available: https://git.cs.dal.ca/hrishi/csci5709/-/tree/tutorial3 [Accessed: 18-Feb-2023].
- [2] Hrishi Patel, "Assignment 1", Dalhousie University. [Online]. Available: https://git.cs.dal.ca/hrishi/csci5709/-/tree/assignment1. [Accessed: 17-Feb-2023]
- [3] “Components,” Chakra UI: Simple, Modular and Accessible UI Components for your React Applications. [Online]. Available: https://chakra-ui.com/docs/components. [Accessed: 01-Mar-2023].
- [4] “Vite,” Vitejs.dev. [Online]. Available: https://vitejs.dev/. [Accessed: 01-Mar-2023].
- [5] “React,” Reactjs.org. [Online]. Available: https://reactjs.org/. [Accessed: 01-Mar-2023].
- [6] “JavaScript with syntax for types,” Typescriptlang.org. [Online]. Available: https://www.typescriptlang.org/. [Accessed: 01-Mar-2023].
- [7] Ketul Patel, “Assignment - 1” GitLab. [Online]. Available: https://git.cs.dal.ca/ketul/csci5709/-/tree/assignment1. [Accessed: 01-Mar-2023].
- [8] Priyal Patel, "Assignment 1", Dalhousie University. [Online]. Available: https://git.cs.dal.ca/priyalp/csci5709/-/tree/assignment1 [Accessed: 25-Feb-2023].
‌- [9] J. Watmore, “React - Display a list of items,” Jasonwatmore.com, Sep. 13, 2020. Available: https://jasonwatmore.com/post/2020/09/13/react-display-a-list-of-items [Accessed 25-Feb-2023].
- [11] S. Singh, “Create a Simple Search Component in React.js using React Hooks | Geek Culture,” Medium, May 25, 2021. https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58#:~:text=Firstly%2C%20we%20import%20useState%20from,list%20received%20from%20the%20parent [Accessed 25-Feb-2023].