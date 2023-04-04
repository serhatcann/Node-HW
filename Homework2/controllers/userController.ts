import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { User } from '../types/user';

let users: User[] = [
	{ id: uuid(), login: 'user1', password: 'password1', age: 20 },
	{ id: uuid(), login: 'user2', password: 'password2', age: 25 },
	{ id: uuid(), login: 'user3', password: 'password3', age: 30 },
];

export const getUserById = (req: Request, res: Response) => {
	const user = users.find(
		(user) => user.id === req.params.id && !user.isDeleted,
	);
	if (user) {
		res.json(user);
	} else {
		res.status(404).send({ message: 'User not found' });
	}
};

export const createUser = (req: Request, res: Response) => {
	const newUser: User = {
		id: uuid(),
		login: req.body.login,
		password: req.body.password,
		age: req.body.age,
	};

	users.push(newUser);
	res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
	const userIndex = users.findIndex(
		(user) => user.id === req.params.id && !user.isDeleted,
	);
	if (userIndex !== -1) {
		const updatedUser: User = {
			...users[userIndex],
			login: req.body.login,
			password: req.body.password,
			age: req.body.age,
		};

		users[userIndex] = updatedUser;
		res.json(updatedUser);
	} else {
		res.status(404).send({ message: 'User not found' });
	}
};

export const getAutoSuggestUsers = (req: Request, res: Response) => {
	const { loginSubstring, limit } = req.query;
	let filteredUsers = users;
	if (loginSubstring) {
		filteredUsers = users.filter(
			(user) =>
				user.login
					.toLowerCase()
					.includes(String(loginSubstring).toLowerCase()) && !user.isDeleted,
		);
	}
	const sortedUsers = filteredUsers.sort((a, b) =>
		a.login.localeCompare(b.login),
	);
	const limitedUsers = sortedUsers.slice(
		0,
		limit ? parseInt(limit.toString()) : sortedUsers.length,
	);

	res.json(limitedUsers);
};

export const softDeleteUser = (req: Request, res: Response) => {
	const userIndex = users.findIndex(
		(user) => user.id === req.params.id && !user.isDeleted,
	);
	if (userIndex !== -1) {
		users[userIndex].isDeleted = true;
		res.send({ message: 'User deleted' });
	} else {
		res.status(404).send({ message: 'User not found' });
	}
};
