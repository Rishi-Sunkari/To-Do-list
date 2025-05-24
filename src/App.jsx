import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const App = () => {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('my-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const tasksRef = useRef(null);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');


  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tasksRef.current) {
      gsap.fromTo(
        tasksRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
      );
    }
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return; 
    setTasks(tasks.map(t => t.id === id ? {...t, text: editText} : t));
    setEditId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background:
          'linear-gradient(to right, #e0c3fc, #8ec5fc)',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          width: '1000px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>To-Do List</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your task here"
          style={{
            width: '100%',
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '2px solid #ccc',
            outline: 'none',
            marginBottom: '10px',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTask();
          }}
        />
        <button
          onClick={addTask}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4183c5',
            color: 'white',
            fontSize: '16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Add
        </button>

        <div
          ref={tasksRef}
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {tasks.length === 0 ? (
            <p style={{ color: 'gray', textAlign: 'center' }}>
              No Data
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  background: '#f9f9f9',
                  padding: '10px',
                  borderRadius: '8px',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {editId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{
                        flexGrow: 1,
                        padding: '8px',
                        fontSize: '16px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(task.id);
                        else if (e.key === 'Escape') cancelEdit();
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => saveEdit(task.id)}
                      style={{
                        backgroundColor: '#4183c5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        padding: '6px 12px',
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{
                        backgroundColor: '#999',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        padding: '6px 12px',
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span style={{ flexGrow: 1 }}>{task.text}</span>
                    <button
                      onClick={() => startEdit(task)}
                      style={{
                        backgroundColor: '#3a7bd5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        padding: '5px 10px',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTask(task.id)}
                      style={{
                        backgroundColor: 'rgb(181, 2, 2)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        padding: '5px 10px',
                      }}
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
