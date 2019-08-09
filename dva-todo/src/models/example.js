import _ from 'lodash';
export default {

  namespace: 'example',

  state: {
    list: [{
        name: 'eat',
        status: true,
      },
      {
        name: 'sleep',
        status: false,
      },
      {
        name: 'coding',
        status: true,
      },
    ],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    add(state,{item}){
      return{
        ...state,
        list:_.concat(state.list,[item]),
      };
    },
    check(state ,{index, value}) {
      let newState = _.clone(state.list);
      newState[index].status = value;
      return{
        ...state,
        list: newState
      }
    },
    delete(state,{ index } ){
      return{
        ...state,
        list: _.filter(state.list,(item, i ) => !_.isEqual(index,i))
      }
    }
  },


};
