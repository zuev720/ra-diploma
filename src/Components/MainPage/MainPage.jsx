import React from "react";
import {TopSales} from "./TopSales";
import {Catalog} from "./Catalog";

export function MainPage() {
    return (
        <div className={'MainPage'}>
            <main className="container">
                <div className="row">
                    <div className="col">
                        <div className="banner">
                            <img src={"banner.jpg"} className="img-fluid" alt="К весне готовы!"/>
                            <h2 className="banner-header">К весне готовы!</h2>
                        </div>
                        <TopSales />
                        <Catalog />
                    </div>
                </div>
            </main>
        </div>
    )
}