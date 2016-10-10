import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Field extends Component {
    constructor() {
        super()
        this.state = { value: null }
    }

    componentWillMount() {
        this.setState({ value: this.props.value })
    }

    render() {
        if (this.props.type == 'text' || this.props.type == 'password') return (
            <TextField
                type={this.props.type}
                multiLine={!!this.props.rows}
                rows={this.props.rows}
                floatingLabelText={this.props.name}
                disabled={this.props.disabled}
                value={this.state.value}
                onChange={(event, value) => {
                    this.setState({ value });
                    this.props.onChange(value)
                } }
                />
        )
        if (this.props.type == 'select') return (
            <SelectField
                value={this.state.select}
                floatingLabelText={this.props.name}
                disabled={this.props.disabled}
                value={this.state.value}
                onChange={(event, index, value) => {
                    this.setState({ value });
                    this.props.onChange(value);
                } }
                >
                {
                    this.props.options.map(o => {
                        return <MenuItem key={o.value} value={o.value} primaryText={o.name} />
                    })
                }
            </SelectField>
        )
    }
}


Field.defaultProps = {
    value: '',
}

export default Field