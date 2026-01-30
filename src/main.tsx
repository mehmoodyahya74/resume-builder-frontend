import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-VMZC20JG32"; // your GA ID

const Root = () => {
  useEffect(() => {
    // Load GA script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(script2);
  }, []);

  return (
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);

