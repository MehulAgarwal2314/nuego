import logo from './logo.svg';
import './App.css';
import React from 'react'
import { useState } from 'react';


function App() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [results, setResults] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to your backend to get bus schedules based on departure and destination.
      // const response = await fetch(`http://localhost:3000/api/bus-schedules?departure=${departure}&destination=${destination}`);
      const response = await fetch(`  https://nuego1-d9f344fa00ee.herokuapp.com?departure=${departure}&destination=${destination}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
    <>
     <main>
    <article>
<section className="tour-search">
  <div className="container">
    <form action className="tour-search-form" onSubmit={handleFormSubmit}>
      <div className="input-wrapper">
        <label htmlFor="destination" className="input-label" >Enter Departure</label>
        <input type="text" name="destination" id="destination" required placeholder="Enter Destination" className="input-field" value={departure} onChange={(e) => setDeparture(e.target.value)}/>
      </div>
      <div className="input-wrapper">
        <label htmlFor="destination" className="input-label">Enter Destination</label>
        <input type="text" name="destination" id="destination" required placeholder="Enter Destination" className="input-field" value={destination} onChange={(e) => setDestination(e.target.value)}/>
      </div>
      <div className="input-wrapper">
        <label htmlFor="people" className="input-label">No. of People</label>
        <input type="number" name="people" id="people" required placeholder="No.of People" className="input-field" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="checkin" className="input-label"> Date</label>
        <input type="date" name="checkin" id="checkin" required className="input-field" />
      </div>
      <button type="submit" className="btn btn-secondary" >Search Buses</button>
    </form>
  </div>
</section>


   {/* Display search results here */}
   <section className="search-results">
            {results.map((result) => (
              <div key={result.id}>
                <h3>Origin: {result.origin_city}</h3>
                <h3>Destination: {result.destination_city}</h3>
                <p>Fare: {result.fare}</p>
                <p>Departure Time: {result.departure_time}</p>
                <p>Arrival Time: {result.arrival_time}</p>
              </div>
            ))}
          </section>
</article>
</main>
</>
  );
}

export default App;
