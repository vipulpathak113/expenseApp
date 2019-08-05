import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";

// function saveToLocalStorage(state){
//     try{
//         const serializedState= JSON.stringify(state)
//         localStorage.setItem('state',serializedState)
//     } catch(e){
//       console.log(e)
//     }
// }

// function loadFromLocalStorage(){
//     try{
//         const serializedState= localStorage.getItem('state')
//         if(serializedState===null) return undefined
//        return JSON.parse(serializedState)
//     } catch(e){
//      console.log(e)
//      return undefined
//     }
// }

// const composeEnhancers = compose;
// const persistedState=loadFromLocalStorage()
const middleware = applyMiddleware(thunk);
const store = createStore(
  // rootReducer, persistedState,composeEnhancers(middleware),
  rootReducer,
  middleware
);

// store.subscribe(()=>saveToLocalStorage(store.getState()))

export default store;
