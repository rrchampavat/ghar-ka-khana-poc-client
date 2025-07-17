import { HeroUIProvider } from "@heroui/react";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import useDarkMode from "use-dark-mode";
import "./App.css";
import routes from "./routes/routes";
import { Toaster } from "./ui/components/toast/toaster";
import Fallback from "./ui/layouts/fallback";

function App() {
  const { value: isDarkMode } = useDarkMode(false);

  return (
    <HeroUIProvider>
      <main
        className={`${isDarkMode ? "dark" : ""} bg-background text-foreground`}
      >
        <Toaster />
        <Suspense fallback={<Fallback />}>
          <RouterProvider router={routes} />
        </Suspense>
      </main>
    </HeroUIProvider>
  );
}

export default App;
