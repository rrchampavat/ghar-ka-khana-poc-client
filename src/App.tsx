import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import useDarkMode from "use-dark-mode";
import "./App.css";
import Providers from "./providers";
import routes from "./routes/routes";
import Fallback from "./ui/layouts/fallback/Fallback";

function App() {
  const { value: isDarkMode } = useDarkMode(false, {
    // Applies dark mode to html so modals rendered via portals inherit the theme
    element: document.documentElement,
    classNameDark: "dark"
  });

  return (
    <Providers>
      <main
        className={`${isDarkMode ? "dark" : ""} bg-background text-foreground h-screen`}
      >
        <Suspense fallback={<Fallback />}>
          <RouterProvider router={routes} />
        </Suspense>
      </main>
    </Providers>
  );
}

export default App;
