import { CSSProperties } from 'react';

const name = 'Nano';
const lastName = 'Mixer';
const favoriteGames = ['Pokemon', 'Half Life', 'Halo'];
const isActive = false;
const address = {
  zipCode: '12345',
  street: 'Main St',
  city: 'Anytown',
  state: 'CA',
  country: 'USA',
};

const myStyle: CSSProperties = {
  display: 'block',
  color: isActive ? 'blue' : 'red',
  fontSize: '16px',
  fontWeight: 'bold',
  marginLeft: '100px',
};

export function MyAwesomeApp() {
  return (
    <div data-testid="first-name-container">
      <h1 data-testid="first-name">{name}</h1>
      <h2>{lastName}</h2>

      <p>Favorite games: {favoriteGames.join(', ')}</p>
      <p>{12 + 2}</p>

      <h1>{isActive ? 'active' : 'inactive'}</h1>

      <p style={myStyle}>{JSON.stringify(address)}</p>
    </div>
  );
}

export default MyAwesomeApp;
