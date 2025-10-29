import { cn } from "@/lib/utils";
import {
  Select as HeroUISelect,
  SelectItem,
  type SelectProps
} from "@heroui/react";

export type SELECT_ITEM = {
  key: string | number;
  label: string | number | undefined;
};

interface SELECT_PROPS extends Omit<SelectProps, "children"> {
  items: SELECT_ITEM[];
  children?: React.ReactNode | ((item: SELECT_ITEM) => React.ReactNode);
}

const Select = (props: SELECT_PROPS) => {
  const { className } = props;

  return (
    <HeroUISelect {...props} className={cn(className)}>
      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    </HeroUISelect>
  );
};

export default Select;
