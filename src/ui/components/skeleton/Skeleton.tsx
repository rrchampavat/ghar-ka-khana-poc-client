import { cn } from "@/lib/utils";
import { Skeleton as HeroUISkeleton, type SkeletonProps } from "@heroui/react";

const Skeleton = (props: SkeletonProps) => {
  const { className } = props;

  return <HeroUISkeleton {...props} className={cn(className)} />;
};

export default Skeleton;
