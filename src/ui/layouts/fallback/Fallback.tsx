import Spinner from "@/ui/components/spinner/Spinner";

const Fallback = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner label="Loading..." size="lg" />
    </div>
  );
};

export default Fallback;
