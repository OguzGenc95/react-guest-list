import { useState } from 'react';

export default function App() {
  const [firstName, setFirstName] = useState(''); // state definition für firstName
  const [lastName, setLastName] = useState(''); // state definition für lastName
  const [guestbook, setGuestbook] = useState([]); // state definition für guestbook --> initialisierung als array

  let id = 0;

  const handleFirstNameChange = (event) => {
    // event wird an "handleFirstNameChange" übergeben, Wert aus Input Feld steht in event.target.value
    setFirstName(event.target.value); // verwenden von set Funktion aus state definition zum setzen eines neuen Wertes im State für firstName
  };

  const handleLastNameChange = (event) => {
    // event wird an "handleLastNameChange" übergeben, Wert aus Input Feld steht in event.target.value
    setLastName(event.target.value); // verwenden von set Funktion aus state definition zum setzen eines neuen Wertes im State für lastName
  };

  const createGuestbookEntry = () => {
    // Jetzt: firstName + LastName auslesen & ins Gästebuch schreiben
    setGuestbook([
      ...guestbook,
      { id: ++id, firstName: firstName, lastName: lastName, attending: false },
    ]);

    // Am Ende: value von firstName auf "" setzen
    setFirstName('');

    // Am Ende: value von lastName auf "" setzen
    setLastName('');
  };

  const handleAttendingChange = (guestId) => {
    // array index von Gast mit der geklickten ID herausfinden
    const guestIndex = guestbook.findIndex((guest) => guest.id === guestId);

    // diesen Gast aus dem Gästebuch "auslesen"
    const guest = guestbook[guestIndex];

    // Attending Status abändern (wenn vorher true, dann false --> wenn vorher false, dann true)
    guest.attending = !guest.attending;

    // Kopie von Gästebuch anlegen
    const newGuestbook = [...guestbook];

    // Gast in der Kopie vom Gästebuch abändern
    newGuestbook[guestIndex] = guest;

    // Gästebuch auf das angepasste Gästebuch setzen
    setGuestbook([...newGuestbook]);
  };

  const removeGuest = (guestId) => {};

  return (
    <div>
      <form>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            onKeyDown={(event) => {
              if (event.key == 'Enter') {
                createGuestbookEntry();
              }
            }}
          />
        </label>
      </form>
      <ul>
        {guestbook.map((guest) => (
          <li key={`guest-${guest.id}`}>
            {guest.firstName} {guest.lastName}{' '}
            <input
              type="checkbox"
              checked={guest.attending}
              onChange={() => {
                handleAttendingChange(guest.id);
              }}
            />
            <input
              type="button"
              value="Remove"
              onClick={() => {
                removeGuest(guest.id);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
