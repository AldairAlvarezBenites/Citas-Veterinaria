import { useState, useEffect } from 'react';

import PropTypes from "prop-types";
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente}) => {

    const [ nombre, setNombre ] = useState("");
    const [ propietario, setPropietario ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ alta, setAlta ] = useState("");
    const [ sintomas, setSintomas ] = useState("");

    const [ error, setError ] = useState(false);

    useEffect( () => {
        if( Object.keys(paciente).length > 0 ) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setAlta(paciente.alta)
            setSintomas(paciente.sintomas)

        }
    },[paciente])

    const generarId = () => {
        const random = Math.random().toString(36).slice(1,2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const actualizarFormulario = e => {
        e.preventDefault();

        if( [nombre, propietario, email, alta, sintomas ].includes("")) {
            setError(true);
            return;
        } 
        setError(false)

        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            alta, 
            sintomas,
        }

        if(paciente.id) {
            objetoPaciente.id = paciente.id;

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
            setPacientes(pacientesActualizados);

            setPaciente({});
        } else {
            objetoPaciente.id = generarId();
            setPacientes([
                ...pacientes,
                objetoPaciente
            ])
        }

        setNombre("");
        setPropietario("");
        setEmail("");
        setAlta("");
        setSintomas("");
    }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {""}
            <span className="text-indigo-600 font-bold">Aministralos</span>
        </p>

        <form 
            onSubmit={actualizarFormulario}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
            { error && <Error mensaje="Todos los campos son obligatorios"/>}
            <div className="mb-5">
                <label 
                    htmlFor="mascota"
                    className="bold text-gray-700 uppercase font-bold">
                    Nombre Mascota
                </label>

                <input 
                    id="mascota"
                    type="text" 
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="propietario"
                    className="bold text-gray-700 uppercase font-bold">
                    Nombre Propietario
                </label>

                <input 
                    id="propietario"
                    type="text" 
                    placeholder="Nombre del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={ e => setPropietario(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="bold text-gray-700 uppercase font-bold">
                    Email
                </label>

                <input 
                    id="email"
                    type="email" 
                    placeholder="email contacto propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="alta"
                    className="bold text-gray-700 uppercase font-bold">
                    Alta
                </label>

                <input 
                    id="alta"
                    type="date" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={alta}
                    onChange={ e => setAlta(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="sintomas"
                    className="bold text-gray-700 uppercase font-bold">
                    Síntomas
                </label>

                <textarea 
                    id="sintomas" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los síntomas"
                    value={sintomas}
                    onChange={ e => setSintomas(e.target.value)}
                />
            </div>

            <input 
                type="submit" 
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
            />
        </form>
    </div>
  )
}

Formulario.propTypes = {
    pacientes: PropTypes.array.isRequired,
    setPacientes: PropTypes.func.isRequired,
    paciente: PropTypes.object.isRequired,
    setPaciente: PropTypes.func.isRequired,
}

export default Formulario
