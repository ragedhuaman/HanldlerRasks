import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContext';
import ListadoProyectos from './ListadoProyectos';

const Proyectos = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    const [showProyects, setShowProyects] = useState(true)
    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return ( 
        <div className="contenedor-app">
            <Sidebar setShowProyects={setShowProyects}/>

            <div className="seccion-principal">
                <Barra />
                <main>
                    {
                    showProyects
                    ?<div className='contenedor-proyectos centrado'>
                        <ListadoProyectos setShowProyects={setShowProyects}/>
                    </div>
                    :<div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                    }
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;