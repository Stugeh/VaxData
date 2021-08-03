import './App.css';
import { useState } from 'react';
// import useFetchOrders from './hooks/useFetchOrders';

import TopBar from './components/TopBar';

function App() {
  // const { data } = useFetchOrders();
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <div className="App">
      <TopBar setDate={setDate} date={date} />
    </div>
  );
}

export default App;
