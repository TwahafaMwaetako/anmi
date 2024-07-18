import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';

const VaccinationPage = ({ animals, onAddVaccination, onBack }) => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showVaccinationForm, setShowVaccinationForm] = useState(false);
  const [vaccinationData, setVaccinationData] = useState({
    type: '',
    date: '',
    nextDate: '',
  });

  const handleAnimalSelect = (e) => {
    const animal = animals.find(a => a.id === parseInt(e.target.value));
    setSelectedAnimal(animal);
    setShowVaccinationForm(false);
  };

  const handleChange = (e) => {
    setVaccinationData({ ...vaccinationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVaccination(selectedAnimal.id, vaccinationData);
    setVaccinationData({ type: '', date: '', nextDate: '' });
    setShowVaccinationForm(false);
  };

  return (
    <div className="vaccination-page">
      <button onClick={onBack} className="back-button">
        <ArrowLeft size={20} style={{ marginRight: '5px' }} />
        Back to Main Page
      </button>
      <h2 className="page-title">Vaccination Management</h2>

      <div className="form-group">
        <label htmlFor="animalSelect" className="form-label">Select Animal</label>
        <select
          id="animalSelect"
          onChange={handleAnimalSelect}
          className="form-select"
          value={selectedAnimal ? selectedAnimal.id : ''}
        >
          <option value="">Choose an animal</option>
          {animals.map(animal => (
            <option key={animal.id} value={animal.id}>{animal.name} (Tag: {animal.tag})</option>
          ))}
        </select>
      </div>

      {selectedAnimal && (
        <div className="animal-vaccination-info">
          <h3>{selectedAnimal.name}'s Vaccination History</h3>
          {selectedAnimal.vaccinations && selectedAnimal.vaccinations.length > 0 ? (
            <ul className="vaccination-list">
              {selectedAnimal.vaccinations.map((vaccination, index) => (
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

          {!showVaccinationForm && (
            <button onClick={() => setShowVaccinationForm(true)} className="add-vaccination-button">
              <Plus size={20} style={{ marginRight: '5px' }} />
              Add Vaccination
            </button>
          )}
        </div>
      )}

      {showVaccinationForm && selectedAnimal && (
        <form onSubmit={handleSubmit} className="form-container">
          <h3>Add Vaccination for {selectedAnimal.name}</h3>
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
            <button type="button" onClick={() => setShowVaccinationForm(false)} className="form-button form-button-secondary">Cancel</button>
            <button type="submit" className="form-button form-button-primary">Add Vaccination</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default VaccinationPage;