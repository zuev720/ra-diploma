import './App.css';
import {MainPage} from "./Components/MainPage/MainPage";
import {Footer} from "./Components/Footer/Footer";
import {Header} from "./Components/Header/Header";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {CatalogPage} from "./Components/CatalogPage/CatalogPage";
import {AboutPage} from "./Components/AboutPage/AboutPage";
import {ContactsPage} from "./Components/ContactsPage/ContactsPage";
import {store} from "./store";
import {Provider} from "react-redux";
import {CartPage} from "./Components/CartPage/CartPage";
import {ProductPage} from "./Components/ProductPage/ProductPage";

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
                        <Route exact={true} path="/">
                            <MainPage/>
                        </Route>
                    </Switch>
                    <Footer/>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
