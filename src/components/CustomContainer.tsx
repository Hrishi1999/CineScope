/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import { Flex, useBreakpointValue } from "@chakra-ui/react";

interface ContainerProps extends React.PropsWithChildren<any> {
  children: any;
  flexDirection?: "column" | "row";
}

const Container = ({ flexDirection, children, ...props }: ContainerProps) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      flexDirection={flexDirection ?? "column"}
      p={isDesktop ? 12 : 6}
      borderRadius={8}
      boxShadow={"xl"}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Container;
