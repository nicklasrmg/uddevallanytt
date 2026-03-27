import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { useTheme } from './hooks/useTheme';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { LiveFeedPage } from './pages/LiveFeedPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100">
        <Header theme={theme} onToggleTheme={toggle} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artikel/:id/:slug?" element={<ArticlePage />} />
            <Route path="/kategori/:slug" element={<CategoryPage />} />
            <Route path="/sok" element={<SearchPage />} />
            <Route path="/live" element={<LiveFeedPage />} />
            <Route path="/om" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
