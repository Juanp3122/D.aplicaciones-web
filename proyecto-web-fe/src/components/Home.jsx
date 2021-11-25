import ListaPropietarios from "./ListaPropietarios"
import NavBar from "./NavBar"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
}
    from "react-router-dom"
import PropietarioPost from "./propietarioPost"
import PropietarioDetalle from "./PropietarioDetalle"
export default function Home() {
    return (
        <>
            <NavBar></NavBar>
            <Router>
                <Switch>
                    <Route exact path="/lista-propietarios">
                        <ListaPropietarios></ListaPropietarios>
                    </Route>
                    <Route exact path="/post-propietarios">
                        <PropietarioPost></PropietarioPost>
                    </Route>
                    <Route exact path="/propietario/:propietarioId">
                        <PropietarioDetalle></PropietarioDetalle>
                    </Route>
                </Switch>




            </Router>
        </>
    )
};