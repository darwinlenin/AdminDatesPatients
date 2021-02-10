import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales =[];
  }

  //Arreglo de citas
  const  [citas, guardarCitas ] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
    console.log('Documento listo o algo paso con las citas');
  },[citas]);

  // Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([...citas, cita]);
  }

  // Funcion que elimina la cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administra tus citas</h1>
      <div className="container">
        <div className="one-half column">
          <Formulario 
            crearCita={crearCita}
          />
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita 
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
    </Fragment>
  
  );
}

export default App;
