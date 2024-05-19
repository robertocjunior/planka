import React, { useState } from 'react';

const PersonalizedEdit = ({ defaultValue, onUpdate, children }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    onUpdate(value);
  };

  return (
    <div>
      <textarea value={value} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
      {children}
    </div>
  );
};

export default PersonalizedEdit;
