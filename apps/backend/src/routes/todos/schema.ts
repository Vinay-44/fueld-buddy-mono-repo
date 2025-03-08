export const postTodosSchema = {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
    },
    required: ['title'],
  },
};

export const shareTodoSchema = {
  body: {
    type: 'object',
    properties: {
      todoId:{type:'number'},
      shareUserId: { type: 'string' },
    },
    required: ['todoId', 'shareUserId'],
  },
};