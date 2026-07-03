import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { DonatePage } from "./pages/DonatePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/donate"    element={<DonatePage />} />
        <Route path="/privacy"   element={<PrivacyPolicyPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="*"          element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
