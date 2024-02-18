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

  const clearInputVals = () => {
    // setInputVals({ ...presence });
    unsetDiscordPresence();
  };

  const handleInputChange = (inputName) => (e) => {
    const value = e.target.value;
    setInputVals({
      ...inputVals,
      [inputName]: value !== '' ? value : undefined,
    });
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
        <button style={{ flex: 1 }} onClick={clearInputVals}>
          Clear
        </button>
        <button
          style={{ flex: 1 }}
          onClick={() => {
            const { buttonLabelA, buttonUrlA, ...otherInputVals } = JSON.parse(
              JSON.stringify(inputVals)
            );

            Object.keys(otherInputVals).forEach((key) => {
              if (!otherInputVals[key]) delete otherInputVals[key];
            });

            const updatedInputValsCopy = {
              ...otherInputVals,
              ...(buttonLabelA?.length >= 2 &&
                buttonUrlA?.length >= 2 && {
                  buttons: [{ label: buttonLabelA, url: buttonUrlA }],
                }),
            };
            console.info(
              'Form values:',
              JSON.stringify(updatedInputValsCopy, null, 2)
            );
            setDiscordPresence(updatedInputValsCopy);
          }}
        >
          Display
        </button>
      </div>
    </div>
  );
};

export default PresenceInput;
