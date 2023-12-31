import { useEffect, useState } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Headers"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const INITIAL = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  const [pacientes, setPacientes] = useState(INITIAL)
  const [paciente, setPaciente] = useState({})

  useEffect( () => {
    localStorage.setItem( 'pacientes', JSON.stringify( pacientes ));
  },[pacientes])

  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);

    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto mt-20 p-2">
     <Header/>
     <div className="mt-12 md:flex">
      <Formulario 
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
      />
      <ListadoPacientes
        pacientes={pacientes}
        setPaciente={setPaciente}
        paciente={paciente}
        eliminarPaciente={eliminarPaciente}
      />  
     </div>
    </div>
  )
}

export default App
