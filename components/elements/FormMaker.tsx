import React, { ComponentType, useRef } from "react";
import { TextInput as NativeInput, View } from "react-native";
import FormikInput, { FormikeInputProps } from "./FormikInput";

export type FormInputProps = {
  type: "input";
  inputProps: FormikeInputProps;
};

export type FormElementProps = {
  type: "element";
  Element: ComponentType<any>;
};

export type FormMakerProps = FormInputProps | FormElementProps;

type Props = {
  data: FormMakerProps[];
};

const FormMaker = ({ data }: Props) => {
  const refs = useRef(
    Array.from({ length: data.length }, () => React.createRef<NativeInput>())
  );

  return (
    <View>
      {data.map((item, index) => {
        const { type } = item;

        if (type == "element") {
          return <item.Element key={index} />;
        } else {
          const { inputProps } = item;

          return (
            <FormikInput
              key={index}
              onSubmitEditing={() => {
                if (refs.current[index + 1]) {
                    console.log("ref is valid");
                  refs.current[index + 1].current?.focus();
                }else{
                    console.log("ref not valid");
                }
              }}
              ref={refs.current[index]}
              {...inputProps}
            />
          );
        }
      })}
    </View>
  );
};

export default FormMaker;
