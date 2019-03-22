import React, { Component } from 'react'

export default class TodoItem extends Component {

    static defaultProps = {
        item: {},
        onRemove:()=>{},
        onUpdate:()=>{}
    }
    
    constructor(props){
        super(props)
        this.remove=this.remove.bind(this)
        this.update=this.update.bind(this)
        this.check=this.check.bind(this)

        //para pegar o valor do input usando o ref
        this.input=React.createRef()
    }

    check(){
        const item=this.props.item
        item.isChecked=!item.isChecked//invertemos o valor ao clicar, se esta true fica false
        this.props.onUpdate(item)
    }

    update(){
        const item=this.props.item
        item.description=this.input.current.value//pegamos o valor atual do input
        this.props.onUpdate(item)
    }

    remove(){
        this.props.onRemove(this.props.item.id)
    }

    render() {
        const { props } = this,
            item = props.item
        return (
            <li>
                <input className='tw-check' type='checkbox' checked={item.isChecked} onChange={this.check} />
                <input onBlur={this.update} ref={this.input} className='tw-input' type='text' disabled={item.isChecked} defaultValue={item.description} />
                <button onClick={this.remove} className='tw-btn'>X</button>
            </li>
        )
    }
}
