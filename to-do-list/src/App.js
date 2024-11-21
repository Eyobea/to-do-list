import React, { useState, useEffect } from 'react';
import './list.css';
import deleteIcon from './image/delete.png';
import editIcon from './image/edit.png';
import check from './image/check.png';
import checkedImg from './image/checked.jpg';
const App = () => {
  const [name, setName] = useState('');
  const [dis, setDis] = useState([]);
  const [ed, setEd] = useState(null);

  // Helper function to save data to localStorage with timestamp
  const saveDataToLocalStorage = (data) => {
    const expiry = Date.now() + 48 * 60 * 60 * 1000; // 48 hour from now
    localStorage.setItem('tasks', JSON.stringify({ data, expiry }));
  };

  // On component load, check for existing data in localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const { data, expiry } = JSON.parse(storedTasks);
      if (Date.now() < expiry) {
        setDis(data);
      } else {
        localStorage.removeItem('tasks'); // Remove expired data
      }
    }
  }, []);

  const eyob = () => {
    if (name.trim() !== '') {
      if (ed !== null) {
        const editt = dis.map((item, index) =>
          ed === index ? { ...item, text: name } : item
        );
        setDis(editt);
        saveDataToLocalStorage(editt); // Save updated data to localStorage
        setEd(null);
      } else {
        const newData = [...dis, { text: name, isChecked: false }];
        setDis(newData);
        saveDataToLocalStorage(newData); // Save new data to localStorage
      }
      setName('');
    }
  };

  const edit = (index) => {
    setName(dis[index].text);
    setEd(index);
  };

  const del = (index) => {
    const dele = dis.filter((_, i) => i !== index);
    setDis(dele);
    saveDataToLocalStorage(dele); // Save updated data to localStorage
  };

  const checked = (index) => {
    const updatedDis = dis.map((item, i) =>
      i === index ? { ...item, isChecked: !item.isChecked } : item
    );
    setDis(updatedDis);
    saveDataToLocalStorage(updatedDis); // Save updated data to localStorage
  };

  return (
    <div className="continer">
      <div className="continer2">
        <h2>To-Do-List</h2>
        <div className="input1">
          <input
            type="text"
            value={name}
            className="input"
            placeholder="to-do-list"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="button"
            className="add"
            value={ed !== null ? 'Update' : 'Add'}
            onClick={eyob}
          />
          {dis.map((sub, index) => (
            <div className="map" key={index}>
              <span
                style={{ textDecoration: sub.isChecked ? 'line-through' : 'none' }}
              >
                {sub.text}
              </span>
              <main>
                <button onClick={() => del(index)}>
                  <img src={deleteIcon} alt="delete" />
                </button>
                <button onClick={() => edit(index)}>
                  <img src={editIcon} alt="edit" />
                </button>
                <button onClick={() => checked(index)}>
                  <img src={sub.isChecked ? checkedImg : check} alt="check" />
                </button>
              </main>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
