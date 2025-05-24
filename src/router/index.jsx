import { Routes, Route } from "react-router-dom";
import RootLayout from "@/_root/root-layout";
import Home from "@/_root/pages/home";
import Comments from "@/_root/pages/comments";

export default function AppRoutes() {
  return (
    <>
      <Routes element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </>
  );
}
