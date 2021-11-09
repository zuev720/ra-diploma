import React from "react";
import {Link, NavLink} from "react-router-dom";
import {SearchForm} from "./SearchForm";
import {SearchButton} from "./SearchButton";
import {HeaderCartIcon} from "./HeaderCartIcon";

export function Header() {

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <Link className="navbar-brand" to={'/'}>
                            <img src={'/header-logo.png'} alt="Bosa Noga" />
                        </Link>

                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active flex-direction-column justify-content-center">
                                    <NavLink exact={true} activeClassName={'active'} className="nav-link" to={'/'}>Главная</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName={'active'} className="nav-link" to={'/catalog'}>Каталог</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName={'active'} className="nav-link" to={'/about'}>О магазине</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName={'active'} className="nav-link" to={'/contacts'}>Контакты</NavLink>
                                </li>
                            </ul>
                            <SearchForm />
                            <div className="header-controls-pics">
                                <SearchButton />
                                <HeaderCartIcon />
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}