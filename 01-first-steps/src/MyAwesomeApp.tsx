import { CSSProperties } from 'react';

const name = 'Nano';
const lastName = 'Mixer';
const favoriteGames = ['Pokemon', 'Half Life', 'Halo'];
const isActive = true;
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
    <>
      <h1>
        {name} {lastName}
      </h1>

      <p>Favorite games: {favoriteGames.join(', ')}</p>
      <p>{12 + 2}</p>

      <h2>{isActive ? 'active' : 'inactive'}</h2>

      <p style={myStyle}>{JSON.stringify(address)}</p>
    </>
  );
}

export default MyAwesomeApp;
