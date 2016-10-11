
import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


const style = {
  page: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    height: 360,
    width: 300,
    margin: 5,
    textAlign: 'center',
    display: 'inline-block',
  }
}


class LoginView extends Component {

  // // componentWillMount() {
  //   this.props.checkAuth(this.props.route.path)
  // }

  login() {
    let username = this.refs.username.input.value;
    let password = this.refs.password.input.value;
    this.props.login(username, password)
  }
  enter(e) {
    if (e.key === 'Enter') this.login()
  }
  render() {
    return (
      <div style={style.page}>
        <Paper style={style.paper}>
          <h1>{this.props.title}</h1>
          <br />
          <TextField floatingLabelText="用户名" type='text' ref='username' onKeyDown={this.enter.bind(this) } />
          <TextField floatingLabelText="密码" type='password' ref='password' onKeyDown={this.enter.bind(this) } />
          <br />
          <br />
          <br />
          <br />
          <RaisedButton label="登录" primary={true} style={{ width: 256 }} onClick={this.login.bind(this) } />
        </Paper>
        <Snackbar
          action='错误'
          open={!!this.props.error}
          message={this.props.error || ''}
          />
      </div>
    )
  }
}

LoginView.propTypes = {
  title: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
}

LoginView.defaultProps = {
  title: '欢迎使用'
}


export default LoginView;