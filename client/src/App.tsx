import './App.css';
import { useState, useEffect } from 'react';
import useFetchOrders from './hooks/useFetchOrders';
import { getLatestDate } from './utils/useDataHelpers';
import TopBar from './components/TopBar';

function App() {
  const { orders } = useFetchOrders();
  const [date, setDate] = useState<Date | null>(new Date());

  useEffect(() => {
    setDate(getLatestDate(orders));
  }, [orders]);

  return (
    <div className="App">
      <TopBar setDate={setDate} date={date} />
    </div>
  );
}

export default App;
