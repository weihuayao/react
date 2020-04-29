const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: '吃饭' },
    'task-2': { id: 'task-2', content: '睡觉' },
    'task-3': { id: 'task-3', content: '打豆豆' },
    'task-4': { id: 'task-4', content: 'coding' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'TODO',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'TODOING',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'FINISH',
      taskIds: []
    }
  },

  columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData
