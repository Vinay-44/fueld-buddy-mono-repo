export const postTodosSchema = {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
    },
    required: ['title'],
  },
};