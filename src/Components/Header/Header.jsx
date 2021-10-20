import React from "react";
import {Link, NavLink, Redirect} from "react-router-dom";

export function Header() {

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className={'header-navbar navbar-expand-sm navbar-light bg-light'}>
                        <a className="navbar-brand" href="/">
                            <img src={'./header-logo.png'} alt="Bosa Noga"/>
                        </a>
                        <div className="menu navbar-nav mr-auto">
                            <NavLink exact={true} activeClassName={'active'} className="nav-link" to={'/'}>Главная</NavLink>
                            <NavLink activeClassName={'active'} className="nav-link" to={'/catalog'}>Каталог</NavLink>
                            <NavLink activeClassName={'active'} className="nav-link" to={'/about'}>О магазине</NavLink>
                            <NavLink activeClassName={'active'} className="nav-link" to={'/contacts'}>Контакты</NavLink>
                        </div>
                        <div className="wrapper-search-block collapse navbar-collapse" id="navbarMain">
                            <div className={'form-wrapper'}>
                                <form data-id="search-form" className={'header-controls-search-form form-inline invisible'}>
                                    <input className={'form-control'} placeholder="Поиск"/>
                                </form>
                            </div>
                            <div className={'header-controls-pics'}>
                                <div data-id="search-expander"
                                     className={'header-controls-pic header-controls-search'}/>
                                <Link className={'header-controls-pic header-controls-cart'} to={'/cart'}>
                                    <div className={'header-controls-cart-full'}>1</div>
                                    <div className={'header-controls-cart-menu'}/>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}