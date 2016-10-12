import React, { Component, PropTypes } from 'react';
import Header from '../components/App/Header';
import Content from '../components/App/Content';


class AppPage extends Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <Header />
                <Content />
            </div>
        )
    }
}



export default AppPage
