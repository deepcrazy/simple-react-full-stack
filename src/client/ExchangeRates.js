import React from 'react'
import exchangeRates from "./exchangeRates.json";

export default function ExchangeRates(_props) {
    console.log("Exchange rates: ", exchangeRates);
    return (
        <div>
            <p>US Dollar Exchange Rates</p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Country</th>
                        <th scope="col">1 USD =</th>
                        <th scope="col">Current Date</th>
                    </tr>
                </thead>
                <tbody>
                    {exchangeRates.data.length > 0 && (
                        exchangeRates.data.map((exchangeRate) => (
                            <tr>
                                {/* <th scope="row">1</th> */}
                                <td>{exchangeRate.country_currency_desc}</td>
                                <td>{exchangeRate.exchange_rate}</td>
                                <td>{exchangeRate.record_date}</td>
                            </tr>
                        ))
                    )}
                    {/* <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry the Bird</td>
                        <td>Thornton</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}
