import AppDispatcher from '../dispatcher/AppDispatcher';
import Events from 'events'

import { TodoService } from '../services/TodoService';
import TodoConstants from '../constants/TodoConstants';


//instacia de um canal de atendimento
//para emitir eventos e nos escrever em eventos para saber quando ele foi executado para então decidir qual ação tomar
const Channel = new Events.EventEmitter(),
    CHANGE_EVENT = 'change';//quando quisermos alterar, utilizaremos essa constante CHANGE_EVENT

let _todoList = [];


//funções que modificam o store/estado, elas devem ser privadas diferente da getAll
function createItem(description) {
    return TodoService.create({ description, isChecked: false })
        .then(newItem => {
            _todoList.push(newItem)
        })
}

function updateItem(newItem) {
    const itemIndex = _todoList.findIndex(item => {
        return item.id === newItem.id
    })
    //atualizamos o item no itemIndex, recebe o newItem
    _todoList[itemIndex] = newItem
    return TodoService.update(newItem)
}

function removeItem(id) {
    const itemIndex = _todoList.findIndex(item => {
        return item.id === id
    })
    //remover item da lista, passamos o indice e quantos itens a remover no caso somente 1
    _todoList.splice(itemIndex, 1)
    return TodoService.remove(id)
}

function clearAll() {
    const todo = []//itens a fazer
    const done = []//itens já feitos

    _todoList.forEach(item => {
        if (item.isChecked) {//item que já foi feito
            done.push(item)
        }
        else {
            todo.push(item)
        }
    })

    done.forEach(item => removeItem(item.id))
    _todoList = todo
}

//tudo dentro do objeto estara publico
//trabalhando entre Store ---> view
const TodoStore = {
    async getAll() {
        //caso esteja vazio, então fazemos a busca
        if (_todoList.length === 0) {
            _todoList = await TodoService.list();
        }
        //retorna a lista
        return _todoList;
    },
    emitChange() {
        //evento para alteração, assim os inscritos sabem que houve uma alteração
        Channel.emit(CHANGE_EVENT);
    },
    addChangeListener(callback) {
        //permitir que alguem se inscreva na nossa store , e recebe uma função de callback
        Channel.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback) {
        //permitir remover uma inscrição
        Channel.removeListener(CHANGE_EVENT, callback);
    }
}


//ela vai receber uma ação vinda do dispatcher, e vai escolher qual ação vai ser executada
//estamos trabalhando entre dispatcher ---> Store 
async function handleAction(action){
    switch(action.actionType){
        case TodoConstants.TODO_CREATE: //ao invés de ser case: 'criarItem', podendo ter inconsistência, para isso usamos as constantes
            const description = action.description;
            await createItem(description);//executamos a nossa função, como é assincrona chamamos o await para aguardar a ser finalizada
            TodoStore.emitChange();//assim adicionamos um novo item, alterando minha lista, ai avisamos os inscritos que teve alteração na store
            break;
        case TodoConstants.TODO_UPDATE:
            const item = action.item;
            await updateItem(item);
            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_REMOVE:
            const id = action.id;
            await removeItem(id);
            TodoStore.emitChange();
        case TodoConstants.TODO_CLEAR:
            clearAll();
            TodoStore.emitChange();
            break;
    }
}

//registrando nossa store no dispatcher, que recebe uma função que vai escolher qual ação vai ser executada
//e retorna um token
//registra todas as funções em handleAction
TodoStore.dispatchToken = AppDispatcher.register(handleAction);

export default TodoStore;