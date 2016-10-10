import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Field from './Field';


class Modal extends Component {

  constructor() {
    super()
    this.state = { values: {} }
  }

  title() {
    var name = {
      'create': '添加',
      'delete': '删除',
      'update': '修改',
      'detail': '详情',
    }
    return this.props.title + ' - ' + name[this.props.action]
  }

  render() {
    const content = (
      <div>
        {
          this.props.action == 'delete'
            ?
            <div style={{ textAlign: 'center' }}>确认要删除吗？</div>
            :
            this.props.dict.map(e => {
              return <div
                key={e.code}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                >
                <Field
                  {...e }
                  onChange={(value) => this.state.values[e.code] = value }
                  disabled={this.props.action == 'detail'}
                  value={((v) => v == null ? '' : v)(this.props.item && this.props.item[e.code]) }
                  />
              </div>
            })
        }
      </div>
    );

    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={() => {
          this.props.callback();
          this.setState({ values: {} });
        } }
        />,
      <FlatButton
        label="确定"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          this.props.callback(this.state.values);
          this.setState({ values: {} });
        } }
        />,
    ];

    const dialog = {
      title: this.title(),
      actions: actions,
      modal: this.props.modal,
      open: this.props.open,
      onRequestClose: () => {
        this.props.callback();
        this.setState({ values: {} });
      },
      autoScrollBodyContent: this.props.action != 'delete'
    }

    return (
      <Dialog {...dialog} >
        { content }
      </Dialog>
    );
  }
}


Modal.propTypes = {
  title: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  title: '标题',
  modal: false,
  open: false,
  callback: () => {
    console.log('props handleClose function required !')
  }
}


export default Modal






