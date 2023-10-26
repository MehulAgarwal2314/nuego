import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [results, setResults] = useState([]);
  const [cities, setCities] = useState({ origins: [], destinations: [] });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetch("https://nuego1-d9f344fa00ee.herokuapp.com")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching city data:", error));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://nuego1-d9f344fa00ee.herokuapp.com/results?departure=${departure}&destination=${destination}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <main>
        <article>
          <section className="tour-search">
            <div className="container">
              <form
                action
                className="tour-search-form"
                onSubmit={(e) => {
                  handleFormSubmit(e);
                  setFormSubmitted(true);
                }}
              >
                <div className="input-wrapper">
                  <label htmlFor="departure" className="input-label">
                    Select Departure
                  </label>
                  <select
                    name="departure"
                    id="departure"
                    required
                    className="input-field"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                  >
                    <option value="">Select Departure</option>
                    {cities.origins.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="destination" className="input-label">
                    Select Destination
                  </label>
                  <select
                    name="destination"
                    id="destination"
                    required
                    className="input-field"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="">Select Destination</option>
                    {cities.destinations.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="people" className="input-label">
                    No. of People
                  </label>
                  <input
                    type="number"
                    name="people"
                    id="people"
                    required
                    placeholder="No.of People"
                    className="input-field"
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="checkin" className="input-label">
                    {" "}
                    Date
                  </label>
                  <input
                    type="date"
                    name="checkin"
                    id="checkin"
                    required
                    className="input-field"
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
                  Search Buses
                </button>
              </form>
            </div>

          </section>

          <section className="search-results">
            {formSubmitted && results.length === 0 ? (
              <p>No buses available for this route.</p>
            ) : Array.isArray(results) && results.length > 0 ? (
              results.map((result) => (
                <div key={result.id}>
                  <h3>Origin: {result.origin_city}</h3>
                  <h3>Destination: {result.destination_city}</h3>
                  <p>Fare: {result.fare}</p>
                  <p>Departure Time: {result.departure_time}</p>
                  <p>Arrival Time: {result.arrival_time}</p>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </section>
        </article>
      </main>
    </>
  );
}

export default App;
