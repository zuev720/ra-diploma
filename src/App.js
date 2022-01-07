import './App.css';
import {MainPage} from "./components/MainPage/MainPage";
import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/Header/Header";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {CatalogPage} from "./components/CatalogPage/CatalogPage";
import {AboutPage} from "./components/AboutPage/AboutPage";
import {ContactsPage} from "./components/ContactsPage/ContactsPage";
import {store} from "./store";
import {Provider} from "react-redux";
import {CartPage} from "./components/CartPage/CartPage";
import {ProductPage} from "./components/ProductPage/ProductPage";

function App() {
    return (
        <Provider store={store}>
            <div className={'App'}>
                <Router basename={'ra-diploma'}>
                    <Header/>
                    <Switch>
                        <Route path="/cart">
                            <CartPage/>
                        </Route>
                        <Route path="/about">
                            <AboutPage/>
                        </Route>
                        <Route path="/contacts">
                            <ContactsPage/>
                        </Route>
                        <Route path="/catalog/:id">
                            <ProductPage/>
                        </Route>
                        <Route path="/catalog">
                            <CatalogPage/>
                        </Route>
                        <Route>
                            <MainPage path={'/'}/>
                        </Route>
                    </Switch>
                    <Footer/>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
