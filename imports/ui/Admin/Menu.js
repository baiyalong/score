import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import Menus from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import User from 'material-ui/svg-icons/social/group';
import Idea from 'material-ui/svg-icons/image/wb-sunny';
import Setting from 'material-ui/svg-icons/action/settings';
import Account from 'material-ui/svg-icons/action/account-box';


const style = {
    paper: {
        display: 'inline-block',
        float: 'left',
        margin: 0,
        height: '100%'
    }
};


class Menu extends Component {
    constructor() {
        super();
        this.state = {}
    }
    nav(path) {
        browserHistory.push(path)
    }
    render() {
        return (
            <Paper style={style.paper}>
                <Menus>
                    <MenuItem primaryText="众创活动" leftIcon={<Idea />} onClick={() => this.nav('work') }/>
                    <MenuItem primaryText="用户管理" leftIcon={<User />} onClick={() => this.nav('user') }/>
                    <Divider />
                    <MenuItem primaryText="帐号管理" leftIcon={<Account />} />
                    <MenuItem primaryText="系统设置" leftIcon={<Setting />} />
                </Menus>
            </Paper>
        )
    }
}

Menu.propTypes = {
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}

Menu.defaultProps = {
    title: '标题',
    username: '用户名',
}


export default Menu;