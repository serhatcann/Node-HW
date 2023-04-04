import express from 'express';
import {
	createUser,
	getUserById,
	updateUser,
	getAutoSuggestUsers,
	softDeleteUser,
} from '../controllers/userController';
import validator, {
	createUserSchema,
	updateUserSchema,
} from '../validators/userValidator';

const router = express.Router();

router.get('/:id', getUserById);
router.post('/', validator.body(createUserSchema), createUser);
router.put(
	'/:id',
	validator.params(updateUserSchema.params),
	validator.body(updateUserSchema.body),
	updateUser,
);
router.get('/', getAutoSuggestUsers);
router.delete('/:id', softDeleteUser);

export default router;
