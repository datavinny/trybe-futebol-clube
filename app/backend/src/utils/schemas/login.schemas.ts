import * as Joi from 'joi';
import messages from './messages';

const login = Joi.object({
  email: Joi.string().email().required().messages(
    { ...messages, 'string.email': '{{#label}} must be a valid email' },
  ),
  password: Joi.string().min(6).required()
    .messages(messages),

});

export default login;
