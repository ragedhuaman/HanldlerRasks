import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto, setShowProyects}) => {
    const {_id, nombre, descripcion, prioridad, numProcesos} = proyecto
    console.log('Proyecto', proyecto);
    // Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    // obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    // Función para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); // Fijar un proyecto actual
        obtenerTareas(id); // Filtrar las tareas cuando se de click
    }

    function getBackground(){
        if(prioridad === "Alta") return 'rojo'
        if(prioridad === "Media") return 'amarillo'
        if(prioridad === "Baja") return 'verde'
    }
    return (
            <button
                className={` btn btn-blank proyecto block`}
                onClick={ () => {
                    seleccionarProyecto(_id)
                    setShowProyects(false)
                    } 
                }
                >
                    <div className='proyecto-nombre'>
                        <h3>{nombre} </h3>
                    </div>
                    <div className='proyecto-descripcion'>
                        <label>Descripcion</label>
                        <p>{descripcion}</p>
                    </div>
                    <div className='proyecto-descripcion'>
                        <label>Numero de procesos</label>
                        <p>{numProcesos}</p>
                    </div>
                    <div className={`proyecto-prioridad ${getBackground()}`}>
                        <label>Prioridad</label>
                        <p>{prioridad}</p>
                    </div>
            </button>
     );
}
 
export default Proyecto;