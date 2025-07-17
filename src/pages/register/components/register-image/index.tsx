import useDarkMode from "use-dark-mode";

const RegisterImage = () => {
  const { value: isDarkMode } = useDarkMode(false);

  const imageSrc = isDarkMode
    ? "/svgs/logo-white-transparent.svg"
    : "/svgs/logo-black-transparent.svg";

  return (
    <img
      src={imageSrc}
      className="bg-background mx-auto h-60 w-28 md:block"
      alt="Logo"
    />
  );
};

export default RegisterImage;
