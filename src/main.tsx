import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';

const savedLang = localStorage.getItem("kanzy_lang") || "ar";
document.documentElement.lang = savedLang;
document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";

// Load theme from localStorage
const savedTheme = localStorage.getItem("kanzy_theme");
if (savedTheme === "light") {
  document.documentElement.classList.remove("dark");
} else {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register Progressive Web App Service Worker
if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then((reg) => {
        console.log("Kanzy PWA Service Worker registered successfully: ", reg.scope);
      })
      .catch((err) => {
        console.error("Kanzy PWA Service Worker registration failed: ", err);
      });
  });
}

