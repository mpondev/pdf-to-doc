import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);

  const handleSelect = evt => {
    setFile(evt.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      alert('You must select a file');
      return;
    }

    const formdata = new FormData();
    formdata.append('pdf', file);

    fetch('http://localhost:3005/api/uploads', {
      method: 'POST',
      body: formdata,
    }).catch(err => console.error(err));

    document.getElementById('fileInput').value = null;

    setFile(null);
  };

  return (
    <div className="container">
      <input
        id="fileInput"
        className="input"
        name="src-file"
        type="file"
        aria-label="File"
        onChange={handleSelect}
      />
      <button className="button" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
}

export default App;
