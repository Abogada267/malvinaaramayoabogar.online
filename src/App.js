import React, { useState } from 'react';
import fondo from '../src/images/fondo.webp';
import logo from '../src/images/unestudiojuridico.png';
import './App.module.css';
import FamilyAdvice from './FamilyAdvice';
import './index.css';


function App() {
  const appStyle = {
    textAlign: 'center',
    backgroundImage: `url(${fondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const [showForm, setShowForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [currentPage, setCurrentPage] = useState('main');

  const handleRegisterClick = () => {
    setShowForm(true);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'family') {
      setCurrentPage('family');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const urls = {
      family: 'https://tu-pagina-de-familia.com',
      labor: 'https://tu-pagina-laboral.com',
      criminal: 'https://tu-pagina-penal.com',
      consumer: 'https://tu-pagina-consumidor.com',
      immigration: 'https://tu-pagina-inmigracion.com',
      realEstate: 'https://tu-pagina-inmobiliaria.com',
      medicalNegligence: 'https://tu-pagina-negligencia.com',
    };

    if (urls[selectedOption]) {
      window.location.href = urls[selectedOption];
    } else {
      alert('Por favor, selecciona una opción válida.');
    }
  };

  return (
    <div style={appStyle}>
      <div className="App">
        {currentPage === 'main' && (
          <>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="Logo del Estudio Jurídico Malvina Aramayo" />
              <p>Estudio Jurídico <code>Malvina Aramayo</code> & Asociados</p>
              <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                Consúltanos
              </a>
              <div className="App-register">
                <p>Haz clic y regístrate para conectarte con el mejor abogado online en tu zona en menos de 24 horas.</p>
                <button className="App-register-button" onClick={handleRegisterClick}>
                  Regístrate y Consulta
                </button>
              </div>
            </header>
            {showForm && (
              <div className="register-form">
                <h2>¿Qué abogado necesitas?</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      <input type="radio" name="lawyerType" value="family" onChange={handleOptionChange} />
                      Derecho de Familia
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="lawyerType" value="labor" onChange={handleOptionChange} />
                      Derecho Laboral
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="lawyerType" value="criminal" onChange={handleOptionChange} />
                      Derecho Penal
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="lawyerType" value="consumer" onChange={handleOptionChange} />
                      Derecho del Consumidor
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="lawyerType" value="immigration" onChange={handleOptionChange} />
                      Sucesiones
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="lawyerType" value="realEstate" onChange={handleOptionChange} />
                      Derecho Inmobiliario
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="lawyerType" value="medicalNegligence" onChange={handleOptionChange} />
                      Accidentes de Tránsito
                    </label>
                  </div>
                  <button type="submit">Aceptar</button>
                  <p>Opción seleccionada: {selectedOption}</p>
                </form>
              </div>
            )}
          </>
        )}
        {currentPage === 'family' && <FamilyAdvice setCurrentPage={setCurrentPage} />}
      </div>
    </div>
  );
}

export default App;
