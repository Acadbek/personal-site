import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/router";
import React from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="port-theme">
      <BrowserRouter basename="/">
        <AppRoutes />
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
