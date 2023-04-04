import express from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
