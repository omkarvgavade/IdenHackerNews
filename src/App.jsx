import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './Components/Header';
import { StoriesPage } from './pages/StoriesPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/top" replace />} />
              <Route path="/top" element={<StoriesPage type="top" />} />
              <Route path="/new" element={<StoriesPage type="new" />} />
              <Route path="/best" element={<StoriesPage type="best" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;