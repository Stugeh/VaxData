import './App.css';
import { useState, useEffect } from 'react';
import useFetchOrders from './hooks/useFetchOrders';
import { OrganizedOrders, ProducerName } from './types';
import TopBar from './components/TopBar';

const getLatestDate = (data: OrganizedOrders): Date => {
  // if we don't have data return current date
  if (data.SolarBuddhica.length === 0) return new Date();

  // get all the producer names from the enum so we can loop
  const keys: (keyof typeof ProducerName)[] = Object
    .values(ProducerName) as (keyof typeof ProducerName)[];

  // get the latest arrival date of all producers
  // and return them as date objects. (the data is sorted on the backend)
  const firstDates = keys.map((key) => new Date(
    data[key][0].arrived,
  ));

  // sort the combined array and return the most recent date.
  firstDates.sort((a, b) => b.getTime() - a.getTime());
  return firstDates[0];
};

function App() {
  const { data } = useFetchOrders();
  const [date, setDate] = useState<Date | null>(new Date());

  useEffect(() => {
    setDate(getLatestDate(data));
  }, [data]);

  return (
    <div className="App">
      <TopBar setDate={setDate} date={date} />
    </div>
  );
}

export default App;
