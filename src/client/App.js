import React, { useState, useEffect } from "react";
import "./app.css";
import ExchangeRates from "./ExchangeRates";
import ReactImage from "./react.png";
import exchangeRatesData from "./exchangeRates.json";

export default function App() {
  const [userName, setUserName] = useState(null);
  const [amount, setAmount] = useState(0);
  const [country, selectedCountry] = useState(null);
  const [exchangeValueInUSD, setExchangeValueInUSD] = useState(0);
  const [exchangeRates, setExchangeRates] = useState([]);
  const countries = ["Australia-Dollar", "Afghanistan-Afghani", "Albania-Lek", "Algeria-Dinar", "Angola-Kwanza"];

  useEffect(() => {
    console.log("Coming in userName Effect.. ");
    fetch("/api/getUsername")
      .then((res) => res.json())
      .then((user) => setUserName(user.username));

  }, [userName]);

  // useEffect(() => {
  //   fetch("https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/rates_of_exchange?fields=country_currency_desc,exchange_rate,record_date&filter=record_date:gte:2022-09-01")
  //     .then((res) => res.json())
  //     .then((exchangeRates) => {
  //       console.log("exchange rates data: ", exchangeRates.data);
  //       setExchangeRates(exchangeRates.data)
  //     });
  // }, [])

  const handleSelectedCountry = (event) => {
    console.log("Country sel: ", event.target.value);
    selectedCountry(event.target.value);
  }

  const handleAmountOnChange = (event) => {
    setAmount(event.target.value);
    const exchangeRateInUSD = (exchangeRatesData.data.find((item) => item?.country_currency_desc?.toLowerCase() == country.toLowerCase()))?.exchange_rate;
    console.log("exchangeRateInUSD: ", exchangeRateInUSD);
    console.log("Amount: ", event.target.value);
    console.log("In USD: ", event.target.value * exchangeRateInUSD);
    setExchangeValueInUSD(event.target.value * exchangeRateInUSD)
  }

  return (
    <>
      <div>
        {userName ? (
          <h1>{`Hello ${userName}`}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
        {/* <img src={ReactImage} alt="react" /> */}
      </div>

      <div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Countries
          </button>
          <ul className="dropdown-menu">
            {countries.length > 0 && (
              countries.map((country) => (
                <select name="choice" onClick={handleSelectedCountry}>
                  <option value={country}>{country}</option>
                </select>
              ))
            )}
            {/* <li><a className="dropdown-item" href="/">Action</a></li>
            <li><a className="dropdown-item" href="/">Another action</a></li>
            <li><a className="dropdown-item" href="/">Something else here</a></li> */}
          </ul>
        </div>

        <input value={amount} type="number" onChange={handleAmountOnChange}></input>
        <p>{amount}</p>
        <p>Amount in USD = ${exchangeValueInUSD}</p>
        <p></p>
      </div>

      <div>
        <ExchangeRates exchangeRates={exchangeRates}></ExchangeRates>
      </div>

    </>
  );
}
