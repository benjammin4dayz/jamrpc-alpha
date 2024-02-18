import React, { useState, useEffect } from 'react';

const presence = {
  timeStart: '',
  timeEnd: '',
  details: '',
  state: '',
  largeImageKey: '',
  largeImageText: '',
  smallImageKey: '',
  smallImageText: '',
  buttonLabelA: '',
  buttonUrlA: '',
};
Object.freeze(presence);

const inputConfigurations = [
  // { label: 'Time Start', name: 'timeStart', type: 'text' },
  // { label: 'Time End', name: 'timeEnd', type: 'text' },
  { label: 'Details', name: 'details', type: 'text' },
  { label: 'State', name: 'state', type: 'text' },
  { label: 'Large Image', name: 'largeImageKey', type: 'text' },
  { label: '└ Caption', name: 'largeImageText', type: 'text' },
  { label: 'Small Image', name: 'smallImageKey', type: 'text' },
  { label: '└ Caption', name: 'smallImageText', type: 'text' },
  { label: 'Button Label', name: 'buttonLabelA', type: 'text' },
  { label: '└ Link', name: 'buttonUrlA', type: 'text' },
];

// TODO:
//      Move validation logic to the backend to restrict the opportunity
//      for the frontend to break it by sending poorly structured data.
function formatPresenceData(inputVals) {
  /**
   * Ensure string values are at least 2 characters. Can accept an array
   * of strings, which will return true when all values were valid.
   * @param {string | string[]} value
   * @returns {boolean}
   */
  const isValidLen = (value) => {
    if (typeof value === 'string') {
      return value.length >= 2;
    } else if (Array.isArray(value)) {
      const values = value.filter((val) => isValidLen(val));
      return values.length === value.length;
    }
    return false;
  };
  // Deep copy object and destructure keys that aren't included in the final payload
  const { buttonLabelA, buttonUrlA, ...otherInputVals } = JSON.parse(
    JSON.stringify(inputVals)
  );
  // Delete keys from the object if their values are invalid
  Object.keys(otherInputVals).forEach((key) => {
    if (typeof otherInputVals[key] === 'string') {
      if (!otherInputVals[key]) delete otherInputVals[key];
      if (!isValidLen(otherInputVals[key])) delete otherInputVals[key];
    }
  });
  // Add buttons conditionally when both label and url are valid
  if (isValidLen([buttonLabelA, buttonUrlA])) {
    otherInputVals.buttons = [];
    otherInputVals.buttons.push({ label: buttonLabelA, url: buttonUrlA });
    // TODO: Add a second button input
    // if (isValidLen([buttonLabelB, buttonUrlB])) {
    //   otherInputVals.buttons.push({ label: buttonLabelB, url: buttonUrlB });
    // }
  }
  return otherInputVals;
}

const PresenceInput = ({
  style = {},
  setDiscordPresence = () => {},
  unsetDiscordPresence = () => {},
  persistentVals,
}) => {
  const [inputVals, setInputVals] = useState({ ...presence });
  useEffect(() => {
    setInputVals((prevInputVals) => ({
      ...prevInputVals,
      ...persistentVals,
    }));
  }, [persistentVals]);

  const handleInputChange = (inputName) => (e) => {
    const value = e.target.value;
    setInputVals({
      ...inputVals,
      [inputName]: value,
    });
  };

  const onClickClear = () => {
    unsetDiscordPresence();
  };

  const onClickDisplay = () => {
    const data = formatPresenceData(inputVals);
    console.log(JSON.stringify(data, null, 2));
    setDiscordPresence(data);
  };

  return (
    <div style={{ ...style }}>
      {inputConfigurations.map((input, index) => (
        <div style={{ display: 'flex', marginBottom: '8px' }} key={index}>
          <label
            style={{
              alignSelf: 'left',
              whiteSpace: 'nowrap',
              marginRight: '16px',
            }}
            htmlFor={input.name}
          >
            {input.label}
          </label>
          <div style={{ flex: 1, margin: '10px' }}></div>
          <input
            style={{ width: '100%' }}
            id={input.name}
            type={input.type}
            value={inputVals[input.name]}
            onChange={handleInputChange(input.name)}
          />
          <button
            style={{ backgroundColor: 'transparent', border: 'none' }}
            onClick={() => setInputVals({ ...inputVals, [input.name]: '' })}
          >
            X
          </button>
        </div>
      ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button style={{ flex: 1 }} onClick={onClickClear}>
          Clear
        </button>
        <button style={{ flex: 1 }} onClick={onClickDisplay}>
          Display
        </button>
      </div>
    </div>
  );
};

export default PresenceInput;
