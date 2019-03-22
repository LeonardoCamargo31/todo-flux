import React, { Component } from 'react'

export default class NewTodoItem extends Component {
    static defaultProps = {
        onAdd: ()=>{}
    }

    constructor(props) {
        super(props)
        this.state = {
            description: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.add = this.add.bind(this)
    }

    handleChange(event) {
        const { target } = event
        const { name, value } = target
        this.setState({
            [name]: value
        })
    }

    add(event) {
        event.preventDefault()
        const description = this.state.description

        if (description) {
            this.setState({ description: '' })
            this.props.onAdd(description)
        }
    }

    render() {
        const { state } = this
        return (
            <form onSubmit={this.add}>
                <input className='tw-input' type='text' placeholder='Novo item' name='description'
                    onChange={this.handleChange}
                    value={state.description} />
                <button className='tw-btn'>Adicionar</button>
            </form>
        )
    }
}
