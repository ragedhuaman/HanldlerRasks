import React, { useContext, useState, useEffect } from 'react';  
import DatePicker from "react-datepicker";
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const FormTarea = () => {

    // Extrar si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada,  errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: '',
                startDate:"",
                endDate:"",
                responsable:""
            })
        }
    }, [  tareaseleccionada]); 
    //Empleados
    const employeesOptions=[
        {value:1, label:"Juan Espinoza G."},
        {value:2, label:"Pedro Gutierres .H"},
        {value:3, label:"Alejandro Esquizabal .Z"},
        {value:4, label:"Gustavo Arsimendi .A"},
        {value:5, label:"Hernan Pedroza .O"},
        {value:6, label:"Pedro Martinez .C"},
        {value:7, label:"Saul Quispe .T"}
    ]
    // State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: '',
        responsable:0,
        startDate:new Date(),
        endDate:new Date()
    })

    // extraer el nombre del proyecto
    const { nombre, responsable, startDate, endDate } = tarea;

    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] =  proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }
    const handleChangeEmployee = ({value, label}) => {
        guardarTarea({
            ...tarea,
            "responsable" : label
        })
    }
    const handleStarDate = date =>{
        guardarTarea({
            ...tarea,
            "startDate" : new Date(date)
        })
    }
    const handleEndDate = date =>{
        guardarTarea({
            ...tarea,
            "endDate" : new Date(date)
        })
    }
    const onSubmit = e => {
        e.preventDefault();
        // validar
        if(nombre.trim() === '' ) {
            validarTarea();
            return;
        }

        // Si es edición o si es nueva tarea
        if(tareaseleccionada === null ) {
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea({
                ...tarea
            });
        } else {
            // actualizar tarea existente
            actualizarTarea({
                ...tarea
            });

            // Elimina tareaseleccionada del state
            limpiarTarea();
        }
        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        // reiniciar el form
        guardarTarea({
            nombre:"",
            startDate:"",
            endDate:"",
            responsable:0
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre del proceso..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex">
                    <div className="flex date-field">
                        <label className="label-field">Fecha de inicio</label>
                        <DatePicker selected={startDate} onChange={handleStarDate} className="DatePicker" />
                    </div>
                    <div className="flex date-field">
                        <label className="label-field">Fecha de fin</label>
                        <DatePicker selected={endDate} onChange={handleEndDate} className="DatePicker" />
                    </div>
                </div>
                <div className="employee-field">
                    <label className='label-field'>Responsable</label>
                    <Dropdown 
                        className='select'
                        options={employeesOptions} 
                        value={responsable} 
                        onChange={handleChangeEmployee}
                        placeholder={"Select responsable"}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar proceso' : 'Agregar proceso'}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
        </div>
     );
}
 
export default FormTarea;