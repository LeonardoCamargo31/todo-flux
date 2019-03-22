import {Dispatcher} from 'flux'

/*
//estamos enviando o Dispatcher, lá do todoActions
AppDispatcher.dispatch({
    actionType: TodoConstants.TODO_CREATE,
    description
})

//O appDispatcher ele faz a transmição da action ao Store, ele recebe a ação vinda da view, por exemplo TodoActions.create que chama o AppDispatcher.dispatch
//e O appDispatcher vai verificar na store essa função

*/

export default new Dispatcher()
 