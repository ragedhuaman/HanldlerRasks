import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {
    console.log('La tarea a mostrar', tarea)
    // Extrar si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;


    // Extraer el proyecto
    const [proyectoActual] = proyecto;
 
    // Función que se ejecuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id)
    }

    // Función que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true
        }
        actualizarTarea(tarea);
    }

    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    function formatDate(dateText){
        var date=new Date(dateText)
        var day=date.getDate()<10?"0"+date.getDate():date.getDate()
        var month=(date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1)
        var year=date.getFullYear()
        return `${day}-${month}-${year}`
    }
    return ( 
        <li className="tarea sombra">
            <p className="tarea-title">{tarea.nombre} </p>
            <div className="flex">
                <div className="flex">
                    <p className="tarea-label">Fecha de inicio</p>
                    <p>{formatDate(tarea.startDate)}</p>
                </div>
                <div className="flex">
                    <p className="tarea-label">Fecha de fin</p>
                    <p>{formatDate(tarea.endDate)}</p>
                </div>
                <div className="flex">
                <p className="tarea-label">Responsable</p>
                <p>{tarea.responsable}</p>
            </div>
            </div>
            <div className="flex centrado">
                <div className="estado">
                    {tarea.estado 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                            >Incompleto</button>
                        )
                    }
                </div>

                <div className="acciones">
                        <button 
                            type="button"
                            className="btn btn-primario"
                            onClick={() => seleccionarTarea(tarea) }
                        >Editar</button>

                        <button
                            type="button"
                            className="btn btn-secundario"
                            onClick={() => tareaEliminar(tarea._id)}
                        >Eliminar</button>
                </div>
            </div>
        </li>
     );
}
 
export default Tarea;