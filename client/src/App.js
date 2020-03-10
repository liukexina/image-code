import React, { Component } from 'react'
import Routes from './routes'

import '@/assets/styles/reset.min.less'

class App extends Component {
    render() {
        return (
            <div className="app">
                <Routes />
            </div>
        )
    }
}

export default App
