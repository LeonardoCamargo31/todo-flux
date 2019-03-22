import React, { Component } from 'react';
import './App.css';


import TodoList from './views/components/TodoList'
import NewTodoItem from './views/components/NewTodoItem'

import TodoActions from './data/actions/TodoActions';
import TodoStore from './data/stores/TodoStore';

//função que pega o estado
async function getTodoState(){
  return {
    todoList: await TodoStore.getAll()
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { todoList: [] }

    this._onChange = this._onChange.bind(this);//fazeno o bind da função
    this._onChange();//e já executo e carrega a lista
  }

  componentDidMount() {
    //fazemos a inscrição na nossa store, e passamos o metodo que vai ser executado (callback)
    TodoStore.addChangeListener(this._onChange);  
  }

  //quando um componente apagado
  componentWillUnmount(){
    //para remover essa inscrição
    TodoStore.removeChangeListener(this._onChange);
  }

  //função que vai sempre atualizar o estado desse nosso componente
  //_ sinalizar que é privado
  async _onChange(){
    this.setState(await getTodoState());
  }

  render() {
    const { state } = this

    return (
      <div className="App">
        <NewTodoItem onAdd={TodoActions.create} />
        <hr />
        <button className='tw-btn' onClick={TodoActions.clear}>Limpar</button>
        <hr />
        <TodoList items={state.todoList} onRemove={TodoActions.remove} onUpdate={TodoActions.update} />
      </div>
    );
  }
}

export default App;
