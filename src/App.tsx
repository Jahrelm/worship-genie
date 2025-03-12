
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Index from "./pages/Index";
import Bible from "./pages/Bible";
import Songs from "./pages/Songs";
import NotFound from "./pages/NotFound";
import BibleReader from "./components/BibleReader";
import SongFormatter from "./components/SongFormatter";
import ServicePlanner from "./pages/ServicePlanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/bible/:bookId/:chapter" element={<BibleReader />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/songs/:songId" element={<SongFormatter />} />
          <Route path="/planner" element={<ServicePlanner />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
