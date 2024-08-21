import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Popular from './pages/Popular';
import TopRated from './pages/TopRated';
import SearchResults from './pages/SearchResults';
import MovieDetails from './pages/MovieDetails';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Layout>      
    </Router>
  );
};

export default App;
