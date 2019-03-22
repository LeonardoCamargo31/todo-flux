import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';


//quando estamos na view chamamos o Dispatcher, aqui temos AppDispatcher, e executamos o metodo dispatch
//que vai fazer o envio para a nossa store, geralmente enviamos um objeto com a ação a ser feita 
//como {evento:'apagarItem', id: '123'}, e na store teria um if para identicar o evento, é para apagar?
//para não correr o risco de escrever errado, em um componente escreve de um jeito e em outro escrevo difenrente, usamos as Constants
const TodoActions = {
    create(description){
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CREATE,
            description
        })
    },
    update(item){
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_UPDATE,
            item
        })
    },
    remove(id){
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_REMOVE,
            id
        })
    },
    clear(){
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CLEAR
        })
    }
}

export default TodoActions;