import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface User {
	id: string;
	login: string;
	password: string;
	age: number;
	isDeleted: boolean;
}

let users: User[] = [
	{
		id: 'f5b16e5f-70fd-47e2-982a-97addbe99027',
		login: 'test96',
		password: 'test123',
		age: 27,
		isDeleted: false,
	},
	{
		id: '6cb60536-cdbb-4c52-ae57-3d5b3323edbc',
		login: 'test6',
		password: 'test123',
		age: 27,
		isDeleted: false,
	},
	{
		id: 'e8da56f9-80ba-4a09-930b-63beaf23e417',
		login: 'test5',
		password: 'test123',
		age: 27,
		isDeleted: false,
	},
	{
		id: '12f7e821-3c9f-47ee-b159-59717163eac8',
		login: 'test3',
		password: 'test123',
		age: 27,
		isDeleted: false,
	},
	{
		id: '839e6c3b-2379-4076-8e15-d6c4a4f08a9e',
		login: 'test1111',
		password: 'test123',
		age: 27,
		isDeleted: false,
	},
];

const app = express();
app.use(express.json());

// Get user by ID
app.get('/users/:id', (req: Request, res: Response) => {
	const user = users.find(
		(user) => user.id === req.params.id && !user.isDeleted,
	);

	if (!user) {
		res.status(404).send('User not found');
	} else {
		res.send(user);
	}
});

// Create and update user
app.post('/users', (req: Request, res: Response) => {
	const { login, password, age } = req.body;

	// Update existing user
	const existingUser = users.find(
		(user) => user.id === req.body.id && !user.isDeleted,
	);
	if (existingUser) {
		existingUser.login = login;
		existingUser.password = password;
		existingUser.age = age;

		res.send(existingUser);
	} else {
		// Create new user
		const id = uuidv4();
		const newUser: User = { id, login, password, age, isDeleted: false };
		users.push(newUser);

		res.send(newUser);
	}
});

// Get auto-suggest list from limit users, sorted by login property and filtered by loginSubstring in the login property
app.get('/users', (req: Request, res: Response) => {
	const { loginSubstring, limit } = req.query;

	let filteredUsers = users;
	if (loginSubstring) {
		filteredUsers = filteredUsers
			.filter(
				(user) =>
					user.login.includes(loginSubstring as string) && !user.isDeleted,
			)
			.sort((a, b) => (a.login > b.login ? 1 : -1))
			.slice(0, limit ? +limit : users.length);
	}
	res.send(filteredUsers);
});

// Soft delete user
app.delete('/users/:id', (req: Request, res: Response) => {
	const user = users.find(
		(user) => user.id === req.params.id && !user.isDeleted,
	);

	if (!user) {
		res.status(404).send('User not found');
	} else {
		user.isDeleted = true;
		res.send(user);
	}
});

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
