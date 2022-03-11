import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario,  mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;


    // State para Proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: '',
        descripcion:'',
        numProcesos: '',
        prioridad: ''
    });
    const optionsPrioridad = [
        { value: 1, label: "Baja", className: 'prioridad-baja' },
        { value: 2, label: "Media", className: 'prioridad-media' },
        { value: 3, label: "Alta", className: 'prioridad-alta' },

      ];
    // Extraer nombre de proyecto
    const { nombre, descripcion, numProcesos, prioridad } = proyecto;

    // Lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }
    const onChangePrioridad = ({value, label}) => {
        guardarProyecto({
            ...proyecto,
            "prioridad" : label
        })
    }

    // Cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        // Validar el proyecto
        if(nombre === '') {
            mostrarError();
            return;
        }

        // agregar al state
        agregarProyecto(proyecto)
        console.log('El proyecto a guardar =>', proyecto);

        // Reiniciar el form
        guardarProyecto({
            nombre: '',
            prioridad:'',
            descripcion:'',
            numProcesos:'',
        })
    }

    // Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return ( 
        <Fragment>
            <button 
                type="button"
                className="btn btn-block btn-primario"
                onClick={ onClickFormulario }
            >Nuevo Proyecto</button>

            { formulario ? 
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <div className='proyecto-field'>
                                <label for="nombre">Nombre</label>
                                <input 
                                    type="text"
                                    className="input-text"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeProyecto}
                                />
                            </div>
                            <div className='proyecto-field'>
                                <label for="descripcion">Descripcion</label>
                                <textarea 
                                    type="text"
                                    className="input-text"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={onChangeProyecto}
                                />
                            </div>
                            <div className='proyecto-field'>
                                <label for="descripcion">Numero de procesos</label>
                                <input
                                    type="number"
                                    className="input-text"
                                    min="1" 
                                    max="5"
                                    name="numProcesos"
                                    value={numProcesos}
                                    onChange={onChangeProyecto}
                                />
                            </div>
                            <div className='proyecto-field'>
                                <label for="prioridad">Prioridad</label>
                                <div className='input-text centrado'>
                                <Dropdown
                                    name="prioridad"
                                    className="proyecto-select"
                                    options={optionsPrioridad} 
                                    onChange={onChangePrioridad} 
                                    value={prioridad} 
                                    placeholder="Selecciona prioridad" 
                                /> 
                                </div>
                            </div>
                            {/* <input type="file" name="" value="image" /> */}
                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />

                        </form>
                ) : null }

            { errorformulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p>  : null }
        </Fragment>
     );
}
 
export default NuevoProyecto;