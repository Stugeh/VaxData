import './App.css';
import { useState, useEffect } from 'react';
import useFetchOrders from './hooks/useFetchOrders';
import useData from './hooks/useData';
import { getLatestDate } from './utils/dataHelpers';
import TopBar from './components/TopBar';

function App() {
  const { orders } = useFetchOrders();
  const [date, setDate] = useState<Date | null>(new Date());
  const { totalOrders } = useData({ date, orders });

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
