import './App.css';
import { useState, useEffect } from 'react';
import useFetchOrders from './hooks/useFetchOrders';
import useData from './hooks/useData';
import { getLatestDate } from './utils/dataHelpers';
import TopBar from './components/TopBar';
import ChartContainer from './components/ChartContainer';

function App() {
  const { orders, loading } = useFetchOrders();
  const [date, setDate] = useState<Date | null>(new Date());
  const data = useData({
    date: date || new Date(),
    orders,
  });

  useEffect(() => {
    setDate(getLatestDate(orders));
  }, [orders]);

  return (
    <div className="App">
      <TopBar setDate={setDate} date={date} />
      <ChartContainer data={data} loading={loading} />
    </div>
  );
}

export default App;
