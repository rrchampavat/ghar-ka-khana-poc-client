import { cn } from "@/lib/utils";
import { Pagination as HeroUIProps, type PaginationProps } from "@heroui/react";

const Pagination = (props: PaginationProps) => {
  const { className } = props;

  return <HeroUIProps {...props} className={cn(className)} />;
};

export default Pagination;
