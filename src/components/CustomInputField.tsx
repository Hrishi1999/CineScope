/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

interface CustomInputFieldProps extends React.PropsWithChildren<any> {
  icon: React.ReactNode;
  id: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange: (event: any) => void;
}

const CustomInputField = ({
  icon,
  id,
  type,
  placeholder,
  value,
  onChange,
  ...props
}: CustomInputFieldProps) => {
  const accent = "yellow.500";

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={icon} />
      <Input
        id={id}
        type={type}
        variant="outline"
        placeholder={placeholder}
        focusBorderColor={accent}
        mb={3}
        onChange={onChange}
        value={value}
      />
    </InputGroup>
  );
};

export default CustomInputField;
