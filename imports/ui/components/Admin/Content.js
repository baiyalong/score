import React, {Component, PropTypes} from 'react';
import SubHeader from '../SubHeader';
import DataTable from '../DataTable';
import Alert from '../Alert';
import Modal from '../Modal';

class Content extends Component {

  constructor() {
    super()
    this.state = { modal: false, action: null, item: null }
  }

  callback(values) {
    this.setState({ modal: false })
    if (values) {
      switch (this.state.action) {
        case 'create': return this.props.create(values);
        case 'delete': return this.props.remove(this.state.item);
        case 'update': return this.props.update(Object.assign(values, { _id: this.state.item._id }))
        case 'detail':
        default: return;
      }
    }
  }


  render() {
    const content = {
      header: {
        title: this.props.title,
        retrieve: (e) => this.props.retrieve(e),
      },
      table: {
        dict: this.props.dict,
        data: this.props.data,
        create: () => this.setState({ modal: true, action: 'create', item: null }),
        delete: (e) => e && Array.isArray(e) && e.length ? this.setState({ modal: true, action: 'delete', item: e }) : null,
        update: (e) => e && e._id && e._id.length ? this.setState({ modal: true, action: 'update', item: e }) : null,
        detail: (e) => this.setState({ modal: true, action: 'detail', item: e }),
        retrieve: (e) => this.props.retrieve(e),
      },
      modal: {
        open: this.state.modal,
        action: this.state.action,
        item: this.state.item,
        title: this.props.title,
        dict: this.props.dict,
        callback: (v) => this.callback(v)
      }
    }

    return (
      <div style={{ height: '100%', }}>
        <SubHeader {...content.header} />
        <DataTable {...content.table} />
        <Alert error={this.props.error} />
        <Modal {...content.modal} />
      </div>
    )
  }
}


// Content.propTypes = {
//   children: React.PropTypes.element.isRequired
// }

export default Content


