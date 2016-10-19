import React, { Component } from 'react';

const page = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

export default class Wx extends Component {
    render() {
        return (
            <div style={page}>
                <img src="weixinarrow.png" style={{ position: 'absolute', top: '10px', right: '20px' }} />
                <p><b>请点击右上角按钮，选择<span style={{ color: 'rgb(255, 153, 0)' }}>[在浏览器中打开]</span></b></p>
            </div>
        );
    }
}



