import React, {Component, PropTypes} from 'react';
import Content from '../../components/Admin/Content';


class UserPage extends Component {
    render() {
        return (
            <div  style={{ height: '100%' }}>
               <Content title='用户管理' />
            </div>
        )
    }
}


export default UserPage
