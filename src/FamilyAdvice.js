import axios from 'axios';
import React, { useState } from 'react';

function FamilyAdvice({ setCurrentPage }) {
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({ name: '', surname: '', email: '', phone: '' });
  const [selectedOption, setSelectedOption] = useState(''); // Nuevo estado para opciones seleccionadas

  const handleFamilyOptionChange = (event) => {
    setSelectedOption(event.target.value); // Actualiza la opción seleccionada
    setStep(2);
  };

  const handleAgreementOptionChange = (event) => {
    setSelectedOption(event.target.value); // Actualiza la opción seleccionada
    setStep(3);
  };

  const handleContactInfoChange = (event) => {
    const { name, value } = event.target;
    setContactInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/send-email', contactInfo);
      alert('Información enviada correctamente');
      setCurrentPage('main');
    } catch (error) {
      console.error('Error al enviar la información:', error);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div className="register-form">
         <h2>1 <span role="img" aria-label="flecha a la derecha">➡️</span> ¿Qué tipo de asesoría necesitas?</h2>

          <div>
            <label>
              <input
                type="radio"
                name="familyAdviceType"
                value="cuota"
                onChange={handleFamilyOptionChange}
              />
              Cuota de alimentos
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="familyAdviceType"
                value="regimen"
                onChange={handleFamilyOptionChange}
              />
              Régimen de comunicación
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="familyAdviceType"
                value="reclamo"
                onChange={handleFamilyOptionChange}
              />
              Reclamo de alimentos no pagado
            </label>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="register-form">
         <h2>2 <span role="img" aria-label="flecha a la derecha">➡️</span> ¿Tienes un acuerdo homologado?</h2>

          <div>
            <label>
              <input
                type="radio"
                name="agreement"
                value="homologado"
                onChange={handleAgreementOptionChange}
              />
              Sí, tengo un acuerdo homologado
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="agreement"
                value="no-reclamado"
                onChange={handleAgreementOptionChange}
              />
              Nunca reclamé nada
            </label>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="register-form">
          <h2>3 <span role="img" aria-label="flecha a la derecha">➡️</span> Indícanos tus datos de contacto</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleContactInfoChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Apellido:
                <input
                  type="text"
                  name="surname"
                  value={contactInfo.surname}
                  onChange={handleContactInfoChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Correo electrónico:
                <input
                  type="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleContactInfoChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Teléfono:
                <input
                  type="tel"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactInfoChange}
                  required
                />
              </label>
            </div>
            <button type="submit" disabled={!selectedOption}>Aceptar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FamilyAdvice;
