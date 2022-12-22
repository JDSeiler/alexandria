import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";

// A thin wrapper around the Material UI TextField component
// that wires it up to react-hook-form using the `useController` hook.
const TextField = <FormContents extends FieldValues>({
  name,
  control,
  ...rest
}: UseControllerProps<FormContents> & TextFieldProps) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <MuiTextField
      {...field}
      inputRef={field.ref}
      error={typeof fieldState.error !== "undefined"}
      helperText={fieldState.error?.message}
      {...rest}
    />
  );
};

export default TextField;
