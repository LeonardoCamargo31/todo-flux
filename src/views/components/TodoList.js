import React, { Component } from 'react'

import TodoItem from './TodoItem'

export default class TodoList extends Component {
    static defaultProps = {
        items: {},
        onRemove:()=>{},
        onUpdate:()=>{}
    }

    constructor(props){
        super(props)
        this.remove=this.remove.bind(this)
        this.update=this.update.bind(this)
    }

    remove(id){
        this.props.onRemove(id)
    }

    update(item){
        this.props.onUpdate(item)
    }

    render() {
        const { props } = this

        if (props.items.length === 0) {
            return (
                <div>No items results</div>
            )
        }
        else {
            return (
                <ul>
                    {
                        props.items.map(item => <TodoItem 
                            key={item.id} 
                            item={item} 
                            onRemove={this.remove}
                            onUpdate={this.update}/>
                        )
                    }
                </ul>
            )
        }


    }
}
