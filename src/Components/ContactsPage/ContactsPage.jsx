import React from "react";

export function ContactsPage () {
    return(
        <main className="container">
            <div className="row">
                <div className="col">
                    {/*<div className="banner">*/}
                    {/*    <img src="/img/banner.jpg" className="img-fluid" alt="К весне готовы!">*/}
                    {/*        <h2 className="banner-header">К весне готовы!</h2>*/}
                    {/*</div>*/}

                    <section className="top-sales">
                        <h2 className="text-center mt-3">Контакты</h2>
                        <p className={'mt-3'}>Наш головной офис расположен в г.Москва, по адресу: Варшавское шоссе, д. 17, бизнес-центр W
                            Plaza.</p>
                        <h5 className="text-center mt-5">Координаты для связи:</h5>
                        <p className={'mt-3'}>Телефон: <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a> (ежедневно: с 09-00 до 21-00)</p>
                        <p>Email: <a href="mailto:office@bosanoga.ru">office@bosanoga.ru</a></p>
                    </section>
                </div>
            </div>
        </main>
    )
}