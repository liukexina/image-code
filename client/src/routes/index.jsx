import React, { Component } from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import Home from "@/pages/Home"

@withRouter
class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/home" component={Home} />
                <Redirect path="/" to="/home" />
            </Switch>
        )
    }
}

export default Routes
