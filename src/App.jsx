import React, { useState, useEffect } from 'react';
import { Plus, Camera, Users, Syringe, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import './App.css';

const AnimalCard = ({ animal, onViewDetails }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="animal-card"
    onClick={() => onViewDetails(animal)}
  >
    <img src={animal.imageUrl} alt={animal.name} className="animal-image" />
    <div className="animal-info">
      <h3 className="animal-name">{animal.name}</h3>
      <p className="animal-detail">Tag: {animal.tag}</p>
      <p className="animal-detail">Breed: {animal.breed}</p>
      <p className="animal-detail">Gender: {animal.gender}</p>
      <p className="animal-detail">Age: {animal.age} years</p>
      <p className="animal-detail">Weight: {animal.weight} kg</p>
    </div>
  </motion.div>
);

const AddAnimalForm = ({ onAddAnimal, onCancel, existingAnimals }) => {
  const [animalData, setAnimalData] = useState({
    name: '',
    tag: '',
    breed: '',
    gender: '',
    age: '',
    weight: '',
    imageUrl: '/api/placeholder/400/300',
    motherId: '',
    calves: [],
  });

  const handleChange = (e) => {
    setAnimalData({ ...animalData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAnimalData({ ...animalData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAnimal(animalData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Add New Animal</h2>
      <div className="image-upload-container">
        <img src={animalData.imageUrl} alt="Animal preview" className="image-upload-preview" />
        <label htmlFor="image-upload" className="image-upload-label">
          <Camera size={20} style={{ marginRight: '5px' }} />
          Upload Image
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="image-upload-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" id="name" name="name" value={animalData.name} onChange={handleChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" id="tag" name="tag" value={animalData.tag} onChange={handleChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="breed" className="form-label">Breed</label>
        <input type="text" id="breed" name="breed" value={animalData.breed} onChange={handleChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="gender" className="form-label">Gender</label>
        <select id="gender" name="gender" value={animalData.gender} onChange={handleChange} required className="form-select">
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="age" className="form-label">Age (years)</label>
        <input type="number" id="age" name="age" value={animalData.age} onChange={handleChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="weight" className="form-label">Weight (kg)</label>
        <input type="number" id="weight" name="weight" value={animalData.weight} onChange={handleChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="motherId" className="form-label">Mother</label>
        <select id="motherId" name="motherId" value={animalData.motherId} onChange={handleChange} className="form-select">
          <option value="">Select mother</option>
          {existingAnimals.filter(animal => animal.gender === 'Female').map(animal => (
            <option key={animal.id} value={animal.id}>{animal.name} (Tag: {animal.tag})</option>
          ))}
        </select>
      </div>
      <div className="form-button-group">
        <button type="button" onClick={onCancel} className="form-button form-button-secondary">Cancel</button>
        <button type="submit" className="form-button form-button-primary">Add Animal</button>
      </div>
    </form>
  );
};

const VaccinationForm = ({ animal, onAddVaccination, onCancel }) => {
  const [vaccinationData, setVaccinationData] = useState({
    type: '',
    date: '',
    nextDate: '',
  });

  const handleChange = (e) => {
    setVaccinationData({ ...vaccinationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVaccination(animal.id, vaccinationData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Add Vaccination for {animal.name}</h2>
      <div className="form-group">
        <label htmlFor="type" className="form-label">Vaccination Type</label>
        <input type="text" id="type" name="type" value={vaccinationData.type} onChange={handleChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="date" className="form-label">Vaccination Date</label>
        <input type="date" id="date" name="date" value={vaccinationData.date} onChange={handleChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="nextDate" className="form-label">Next Vaccination Date</label>
        <input type="date" id="nextDate" name="nextDate" value={vaccinationData.nextDate} onChange={handleChange} required className="form-input" />
      </div>
      <div className="form-button-group">
        <button type="button" onClick={onCancel} className="form-button form-button-secondary">Cancel</button>
        <button type="submit" className="form-button form-button-primary">Add Vaccination</button>
      </div>
    </form>
  );
};

const AnimalDetails = ({ animal, onBack, onAddVaccination }) => {
  const [showVaccinationForm, setShowVaccinationForm] = useState(false);

  return (
    <div className="animal-details">
      <button onClick={onBack} className="back-button">
        <ArrowLeft size={20} style={{ marginRight: '5px' }} />
        Back to List
      </button>
      <h2 className="animal-details-title">{animal.name}</h2>
      <img src={animal.imageUrl} alt={animal.name} className="animal-details-image" />
      <div className="animal-details-info">
        <p><strong>Tag:</strong> {animal.tag}</p>
        <p><strong>Breed:</strong> {animal.breed}</p>
        <p><strong>Gender:</strong> {animal.gender}</p>
        <p><strong>Age:</strong> {animal.age} years</p>
        <p><strong>Weight:</strong> {animal.weight} kg</p>
        {animal.motherId && <p><strong>Mother:</strong> {animal.motherId}</p>}
        {animal.calves.length > 0 && (
          <div>
            <strong>Calves:</strong>
            <ul>
              {animal.calves.map(calfId => (
                <li key={calfId}>{calfId}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <h3 className="vaccination-title">Vaccination History</h3>
      {animal.vaccinations && animal.vaccinations.length > 0 ? (
        <ul className="vaccination-list">
          {animal.vaccinations.map((vaccination, index) => (
            <li key={index} className="vaccination-item">
              <p><strong>Type:</strong> {vaccination.type}</p>
              <p><strong>Date:</strong> {vaccination.date}</p>
              <p><strong>Next Date:</strong> {vaccination.nextDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No vaccinations recorded.</p>
      )}
      {showVaccinationForm ? (
        <VaccinationForm 
          animal={animal} 
          onAddVaccination={onAddVaccination} 
          onCancel={() => setShowVaccinationForm(false)} 
        />
      ) : (
        <button onClick={() => setShowVaccinationForm(true)} className="add-vaccination-button">
          <Syringe size={20} style={{ marginRight: '5px' }} />
          Add Vaccination
        </button>
      )}
    </div>
  );
};

const kApp = () => {
  const [animals, setAnimals] = useState([
    { id: 1, name: 'Bessie', tag: 'A001', breed: 'Holstein', gender: 'Female', age: 4, weight: 600, imageUrl: '/api/placeholder/400/300', motherId: null, calves: [3], vaccinations: [] },
    { id: 2, name: 'Spot', tag: 'A002', breed: 'Angus', gender: 'Male', age: 3, weight: 550, imageUrl: '/api/placeholder/400/300', motherId: null, calves: [], vaccinations: [] },
    { id: 3, name: 'Daisy', tag: 'A003', breed: 'Holstein', gender: 'Female', age: 0.5, weight: 150, imageUrl: '/api/placeholder/400/300', motherId: 1, calves: [], vaccinations: [] },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

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
    setSelectedAnimal(prevAnimal => ({ ...prevAnimal, vaccinations: [...(prevAnimal.vaccinations || []), vaccinationData] }));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Livestock Manager</h1>
      </header>

      <main>
        {showAddForm ? (
          <AddAnimalForm onAddAnimal={handleAddAnimal} onCancel={() => setShowAddForm(false)} existingAnimals={animals} />
        ) : selectedAnimal ? (
          <AnimalDetails 
            animal={selectedAnimal} 
            onBack={() => setSelectedAnimal(null)} 
            onAddVaccination={handleAddVaccination}
          />
        ) : (
          <div className="animal-list">
            {animals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} onViewDetails={setSelectedAnimal} />
            ))}
          </div>
        )}
      </main>

      {!showAddForm && !selectedAnimal && (
        <button onClick={() => setShowAddForm(true)} className="add-button">
          <Plus size={24} />
        </button>
      )}
    </div>
  );
};

const LivestockApp = () => {
    const [animals, setAnimals] = useState([
      { id: 1, name: 'Bessie', tag: 'A001', breed: 'Holstein', gender: 'Female', age: 4, weight: 600, imageUrl: '/api/placeholder/400/300', motherId: null, calves: [3], vaccinations: [] },
      { id: 2, name: 'Spot', tag: 'A002', breed: 'Angus', gender: 'Male', age: 3, weight: 550, imageUrl: '/api/placeholder/400/300', motherId: null, calves: [], vaccinations: [] },
      { id: 3, name: 'Daisy', tag: 'A003', breed: 'Holstein', gender: 'Female', age: 0.5, weight: 150, imageUrl: '/api/placeholder/400/300', motherId: 1, calves: [], vaccinations: [] },
    ]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
  
    useEffect(() => {
      function onlineHandler() {
        setIsOnline(true);
      }
      function offlineHandler() {
        setIsOnline(false);
      }
      window.addEventListener('online', onlineHandler);
      window.addEventListener('offline', offlineHandler);
  
      // Load animals from localStorage when the component mounts
      const storedAnimals = localStorage.getItem('animals');
      if (storedAnimals) {
        setAnimals(JSON.parse(storedAnimals));
      }
  
      return () => {
        window.removeEventListener('online', onlineHandler);
        window.removeEventListener('offline', offlineHandler);
      };
    }, []);
  
    // Save animals to localStorage whenever the animals state changes
    useEffect(() => {
      localStorage.setItem('animals', JSON.stringify(animals));
    }, [animals]);
  
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
      setSelectedAnimal(prevAnimal => ({ ...prevAnimal, vaccinations: [...(prevAnimal.vaccinations || []), vaccinationData] }));
    };
  
    return (
      <div className="app-container">
        {!isOnline && <div className="offline-message">You are currently offline. Some features may be limited.</div>}
        <header className="app-header">
          <h1 className="app-title">Livestock Manager</h1>
        </header>
  
        <main>
          {showAddForm ? (
            <AddAnimalForm onAddAnimal={handleAddAnimal} onCancel={() => setShowAddForm(false)} existingAnimals={animals} />
          ) : selectedAnimal ? (
            <AnimalDetails 
              animal={selectedAnimal} 
              onBack={() => setSelectedAnimal(null)} 
              onAddVaccination={handleAddVaccination}
            />
          ) : (
            <div className="animal-list">
              {animals.map(animal => (
                <AnimalCard key={animal.id} animal={animal} onViewDetails={setSelectedAnimal} />
              ))}
            </div>
          )}
        </main>
  
        {!showAddForm && !selectedAnimal && (
          <button onClick={() => setShowAddForm(true)} className="add-button">
            <Plus size={24} />
          </button>
        )}
      </div>
    );
  };








export default LivestockApp;