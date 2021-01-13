import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ZipSearch from './components/ZipSearch';
import CitySearch from './components/CitySearch';

function App() {
  return (
    <div className="App">
      <CitySearch/>
      <ZipSearch/>
    </div>
  );
}

export default App;
