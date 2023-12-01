import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [votes, setVotes] = useState({ option1: 0, option2: 0 });
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/getVotes')
      .then(response => setVotes(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleVote = () => {
    if (selectedOption) {
      axios.post('http://localhost:5000/vote', { option: selectedOption })
        .then(() => {
          // Update votes after successful vote
          axios.get('http://localhost:5000/getVotes')
            .then(response => setVotes(response.data))
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h1>Voting App</h1>
      <div>
        <label>
          <input
            type="radio"
            value="option1"
            checked={selectedOption === 'option1'}
            onChange={() => setSelectedOption('option1')}
          />
          Option 1
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="option2"
            checked={selectedOption === 'option2'}
            onChange={() => setSelectedOption('option2')}
          />
          Option 2
        </label>
      </div>
      <button onClick={handleVote}>Vote</button>
      <div>
        <p>Option 1 Votes: {votes.option1}</p>
        <p>Option 2 Votes: {votes.option2}</p>
      </div>
    </div>
  );
}

export default App;
