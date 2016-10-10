import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Menus from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import User from 'material-ui/svg-icons/social/group';
import Idea from 'material-ui/svg-icons/image/wb-sunny';
import Setting from 'material-ui/svg-icons/action/settings';
import Divider from 'material-ui/Divider';
import AQI from 'material-ui/svg-icons/image/blur-on';
import Warning from 'material-ui/svg-icons/alert/warning';
import Account from 'material-ui/svg-icons/action/account-box';
import FontIcon from 'material-ui/FontIcon';

const style = {
    paper: {
        display: 'inline-block',
        float: 'left',
        margin: '0',
        height: '100%'
    }
};


class Menu extends Component {
    render() {
        return (
            <Paper style={style.paper}>
                <Menus>
                    <MenuItem primaryText="众创活动" leftIcon={<Idea />} />
                    <MenuItem primaryText="用户管理" leftIcon={<User />} />
                    <Divider />
                    <MenuItem primaryText="空气质量" leftIcon={<AQI />} />
                    <MenuItem primaryText="预报预警" leftIcon={<Warning />} />
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