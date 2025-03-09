export const postTodosSchema = {
  body: {
    type: 'object',
    properties: {
      task: { type: 'string' },
    },
    required: ['task'],
  },
};

export const shareTodoSchema = {
  body: {
    type: 'object',
    properties: {
      todoId:{type:'string'},
      username: { type: 'string' },
    },
    required: ['todoId', 'username'],
  },
};