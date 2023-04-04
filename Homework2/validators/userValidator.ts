import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

export const createUserSchema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string()
		.regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
		.required(),
	age: Joi.number().integer().min(4).max(130).required(),
});

export const updateUserSchema = {
	params: Joi.object({
		id: Joi.string().uuid().required(),
	}),
	body: Joi.object({
		login: Joi.string().required(),
		password: Joi.string()
			.regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
			.required(),
		age: Joi.number().integer().min(4).max(130).required(),
	}),
};

export default validator;
