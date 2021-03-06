import {Provider} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {store} from "./store";
import './App.css';
import {MainPage} from "./components/MainPage/MainPage";
import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/Header/Header";
import {CatalogPage} from "./components/CatalogPage/CatalogPage";
import {AboutPage} from "./components/AboutPage/AboutPage";
import {ContactsPage} from "./components/ContactsPage/ContactsPage";
import {CartPage} from "./components/CartPage/CartPage";
import {ProductPage} from "./components/ProductPage/ProductPage";

function App() {
    return (
        <Provider store={store}>
            <div className={'App'}>
                <Router>
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
