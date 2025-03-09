export const registerUserSchema = {
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email:{type:'string'},
      password: { type: 'string' },
    },
    required: ['username', 'password','email'],
  },
};

export const loginUserSchema = {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  };