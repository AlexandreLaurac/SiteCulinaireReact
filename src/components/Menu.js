import * as React from "react";
import { Outlet, NavLink } from "react-router-dom";


function Menu() {

    let activeClassName = "actif";

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? activeClassName : undefined} >
                            Recettes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="blog" className={({ isActive }) => isActive ? activeClassName : undefined} >
                            Blog
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <Outlet />

        </div>
    );
}

export default Menu;


