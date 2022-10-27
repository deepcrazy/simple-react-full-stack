import React, { Component, useState, useEffect } from 'react';
import './app.css';
import ReactImage from './react.png';

// export default class App extends Component {
//   state = { username: null };

//   componentDidMount() {
//     fetch('/api/getUsername')
//       .then(res => res.json())
//       .then(user => this.setState({ username: user.username }));
//   }

//   render() {
//     const { username } = this.state;
//     return (
//       <div>
//         {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
//         <img src={ReactImage} alt="react" />
//       </div>
//     );
//   }
// }

export default function App() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    console.log("Coming in Effect.. ")
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => setUserName(user.username));
  }, [userName])

  return (
    <div>
      {userName ? <h1>{`Hello ${userName}`}</h1> : <h1>Loading.. please wait!</h1>}
      <img src={ReactImage} alt="react" />
    </div>
  )
}
