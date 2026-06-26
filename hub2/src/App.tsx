import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import Hub2Page from "@/pages/Hub2Page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="overflow-x-hidden w-full min-h-screen">
              <CinematicHero />
            </div>
          }
        />
        <Route path="/hub2" element={<Hub2Page />} />
      </Routes>
    </BrowserRouter>
  );
}
