import {BrowserRouter, Route, Link, Switch} from "react-router-dom"; //import the package
import Login from "../Login" //import your signIn page
import Signup from "../Signup" //import your signUp page

function MainRouter(){
    return(
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path="/signIn" component={Login} />
                    <Route path="/signUp" component={Signup} />
                </Switch>
            </div>
        </BrowserRouter>

    )
}
export default MainRouter