import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((toyData) => setToys(toyData));
  }, []);

  // STEP 3: POST - Add a Toy
  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  // STEP 4: DELETE - Donate a Toy
  function handleDeleteToy(id) {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  }

  // STEP 5: PATCH - Like a Toy
  function handleLikeToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add a Toy"}
        </button>
      </div>
      <ToyContainer 
        toys={toys} 
        onDeleteToy={handleDeleteToy} 
        onLikeToy={handleLikeToy} 
      />
    </>
  );
}

export default App;
