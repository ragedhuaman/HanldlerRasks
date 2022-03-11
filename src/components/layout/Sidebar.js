import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyectos';
import logo from './pyme.jpg'

const Sidebar = ({setShowProyects}) => {
    return ( 
        <aside>
            <div>
                <div className='centrado'>
                    <img src={logo} alt="pyme" width={"150px"} display={"none"} className="m-0"/>
                </div>
            </div>

            <NuevoProyecto />

            <div className="centrado">
                <button type="button" className="btn btn-proyectos" onClick={()=>setShowProyects(true)}>Mostrar tus proyectos</button>
            </div>
        </aside>
     );
}
 
export default Sidebar;