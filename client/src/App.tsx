import React from 'react';
import './App.css';
import useFetchOrders from './hooks/useFetchOrders';

function App() {
  const { data } = useFetchOrders();
  console.log(`data.Antiqua[0]`, data);
  return (
    <div className="App">
    </div>
  );
}

export default App;
