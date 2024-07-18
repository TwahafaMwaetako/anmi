import React, { useState } from 'react';
import { Plus, Camera, Users, Syringe, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import './App.css';
import VaccinationPage from './VaccinationPage.jsx';

// ... (AnimalCard, AddAnimalForm, and AnimalDetails components remain unchanged)

const LivestockApp = () => {
  const [animals, setAnimals] = useState([
    { id: 1, name: 'Bessie', tag: 'A001', breed: 'Holstein', gender: 'Female', age: 4, weight: 600, imageUrl: '/api/placeholder/400/300', motherId: null, calves: [3], vaccinations: [] },
    { id: 2, name: 'Spot', tag: 'A002', breed: 'Angus', gender: 'Male', age: 3, weight: 550, imageUrl: '/api/placeholder/400/300', motherId: null, calves: [], vaccinations: [] },
    { id: 3, name: 'Daisy', tag: 'A003', breed: 'Holstein', gender: 'Female', age: 0.5, weight: 150, imageUrl: '/api/placeholder/400/300', motherId: 1, calves: [], vaccinations: [] },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showVaccinationPage, setShowVaccinationPage] = useState(false);

  const handleAddAnimal = (newAnimal) => {
    const newId = animals.length + 1;
    const animalWithId = { ...newAnimal, id: newId, vaccinations: [] };
    setAnimals([...animals, animalWithId]);
    
    if (newAnimal.motherId) {
      setAnimals(prevAnimals => 
        prevAnimals.map(animal => 
          animal.id === parseInt(newAnimal.motherId) 
            ? { ...animal, calves: [...animal.calves, newId] }
            : animal
        )
      );
    }
    
    setShowAddForm(false);
  };

  const handleAddVaccination = (animalId, vaccinationData) => {
    setAnimals(prevAnimals => 
      prevAnimals.map(animal => 
        animal.id === animalId 
          ? { ...animal, vaccinations: [...(animal.vaccinations || []), vaccinationData] }
          : animal
      )
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Livestock Manager</h1>
      </header>

      <main>
        {showVaccinationPage ? (
          <VaccinationPage 
            animals={animals}
            onAddVaccination={handleAddVaccination}
            onBack={() => setShowVaccinationPage(false)}
          />
        ) : showAddForm ? (
          <AddAnimalForm onAddAnimal={handleAddAnimal} onCancel={() => setShowAddForm(false)} existingAnimals={animals} />
        ) : selectedAnimal ? (
          <AnimalDetails 
            animal={selectedAnimal} 
            onBack={() => setSelectedAnimal(null)} 
          />
        ) : (
          <div className="animal-list">
            {animals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} onViewDetails={setSelectedAnimal} />
            ))}
          </div>
        )}
      </main>

      {!showAddForm && !selectedAnimal && !showVaccinationPage && (
        <div className="button-group">
          <button onClick={() => setShowAddForm(true)} className="action-button add-button">
            <Plus size={24} />
          </button>
          <button onClick={() => setShowVaccinationPage(true)} className="action-button vaccination-button">
            <Syringe size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LivestockApp;