import React, { useState } from 'react';
import './Main.css';

function Main() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [team1, setTeam1] = useState('red');
  const [team2, setTeam2] = useState('blue');
  const [modifiers1, setModifiers1] = useState([{ name: '', value: '' }]);
  const [modifiers2, setModifiers2] = useState([{ name: '', value: '' }]);
  const [resultDetails, setResultDetails] = useState(null);

  const predefinedModifiers = [
    { name: 'Modifier A', value: 1.04 },
    { name: 'Modifier B', value: 1.2 },
    { name: 'Modifier C', value: 0.9 },
  ];

  const handleNumberChange = (e, setNumber) => {
    setNumber(e.target.value);
  };

  const handleTeamChange = (e, setTeam) => {
    setTeam(e.target.value);
  };

  const handleModifierChange = (index, field, value, setModifiers) => {
    setModifiers((modifiers) =>
      modifiers.map((modifier, i) =>
        i === index ? { ...modifier, [field]: value } : modifier
      )
    );
  };

  const handleAddModifier = (setModifiers) => {
    setModifiers((modifiers) => [...modifiers, { name: '', value: '' }]);
  };

  const handleRemoveModifier = (index, setModifiers) => {
    setModifiers((modifiers) => modifiers.filter((_, i) => i !== index));
  };

  const handleAddPredefinedModifier = (modifier, setModifiers) => {
    setModifiers((modifiers) => [...modifiers, { ...modifier }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const initialSoldiers1 = parseFloat(number1);
    const initialSoldiers2 = parseFloat(number2);
    const totalModifiers1 = modifiers1.reduce((acc, mod) => acc * parseFloat(mod.value || 1), 1);
    const totalModifiers2 = modifiers2.reduce((acc, mod) => acc * parseFloat(mod.value || 1), 1);
    const finalSoldiers1 = initialSoldiers1 * totalModifiers1;
    const finalSoldiers2 = initialSoldiers2 * totalModifiers2;
    const remainingSoldiers = Math.abs(finalSoldiers1 - finalSoldiers2);

    let winner;
    if (finalSoldiers1 > finalSoldiers2) {
      winner = team1;
    } else if (finalSoldiers2 > finalSoldiers1) {
      winner = team2;
    } else {
      winner = 'No one, it\'s a tie';
    }

    setResultDetails({
      team1,
      team2,
      initialSoldiers1,
      initialSoldiers2,
      totalModifiers1,
      totalModifiers2,
      finalSoldiers1,
      finalSoldiers2,
      winner,
      remainingSoldiers,
    });
  };

  return (
    <div className="App">
      <h1>Team Competition</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Number 1:
            <input
              type="number"
              value={number1}
              onChange={(e) => handleNumberChange(e, setNumber1)}
              required
            />
          </label>
          <label>
            Team 1:
            <select value={team1} onChange={(e) => handleTeamChange(e, setTeam1)}>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </label>
          <div>
            {modifiers1.map((modifier, index) => (
              <div key={index}>
                <label>
                  Modifier Name:
                  <input
                    type="text"
                    value={modifier.name}
                    onChange={(e) => handleModifierChange(index, 'name', e.target.value, setModifiers1)}
                  />
                </label>
                <label>
                  Modifier Value:
                  <input
                    type="number"
                    step="0.01"
                    value={modifier.value}
                    onChange={(e) => handleModifierChange(index, 'value', e.target.value, setModifiers1)}
                  />
                </label>
                <button type="button" onClick={() => handleRemoveModifier(index, setModifiers1)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddModifier(setModifiers1)}>
              Add Modifier
            </button>
          </div>
          <div>
            <h3>Predefined Modifiers</h3>
            {predefinedModifiers.map((mod, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleAddPredefinedModifier(mod, setModifiers1)}
              >
                Add {mod.name} ({mod.value})
              </button>
            ))}
          </div>
        </div>
        <div>
          <label>
            Number 2:
            <input
              type="number"
              value={number2}
              onChange={(e) => handleNumberChange(e, setNumber2)}
              required
            />
          </label>
          <label>
            Team 2:
            <select value={team2} onChange={(e) => handleTeamChange(e, setTeam2)}>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </label>
          <div>
            {modifiers2.map((modifier, index) => (
              <div key={index}>
                <label>
                  Modifier Name:
                  <input
                    type="text"
                    value={modifier.name}
                    onChange={(e) => handleModifierChange(index, 'name', e.target.value, setModifiers2)}
                  />
                </label>
                <label>
                  Modifier Value:
                  <input
                    type="number"
                    step="0.01"
                    value={modifier.value}
                    onChange={(e) => handleModifierChange(index, 'value', e.target.value, setModifiers2)}
                  />
                </label>
                <button type="button" onClick={() => handleRemoveModifier(index, setModifiers2)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddModifier(setModifiers2)}>
              Add Modifier
            </button>
          </div>
          <div>
            <h3>Predefined Modifiers</h3>
            {predefinedModifiers.map((mod, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleAddPredefinedModifier(mod, setModifiers2)}
              >
                Add {mod.name} ({mod.value})
              </button>
            ))}
          </div>
        </div>
        <button type="submit">Calculate Winner</button>
      </form>
      {resultDetails && (
        <div>
          <h2>Results</h2>
          <div>
            <h3>Team {resultDetails.team1.toUpperCase()}</h3>
            <p>Initial Soldiers: {resultDetails.initialSoldiers1}</p>
            <p>Total Modifiers: {resultDetails.totalModifiers1.toFixed(2)}</p>
            <p>Final Soldiers: {resultDetails.finalSoldiers1.toFixed(2)}</p>
          </div>
          <div>
            <h3>Team {resultDetails.team2.toUpperCase()}</h3>
            <p>Initial Soldiers: {resultDetails.initialSoldiers2}</p>
            <p>Total Modifiers: {resultDetails.totalModifiers2.toFixed(2)}</p>
            <p>Final Soldiers: {resultDetails.finalSoldiers2.toFixed(2)}</p>
          </div>
          <h2>{resultDetails.winner.toUpperCase()} wins</h2>
          {resultDetails.winner !== 'No one, it\'s a tie' && (
            <h3>Remaining Soldiers: {resultDetails.remainingSoldiers.toFixed(2)}</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
