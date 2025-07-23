import {
  Select as HeroUISelect,
  SelectItem,
  type SelectProps
} from "@heroui/react";

export type SELECT_ITEM = {
  key: string | number;
  label: string;
};

interface SELECT_PROPS extends Omit<SelectProps, "children"> {
  items: SELECT_ITEM[];
  children?: React.ReactNode | ((item: SELECT_ITEM) => React.ReactNode);
}

const Select = (props: SELECT_PROPS) => {
  return (
    <HeroUISelect {...props}>
      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    </HeroUISelect>
  );
};

export default Select;
