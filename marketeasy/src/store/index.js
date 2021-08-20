import { createStore } from 'redux'
import rootRducer from './modules/rootReducer'

const store = createStore(rootRducer)

export default store;