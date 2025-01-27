import express from 'express';
import { createTodo, updateTodo, deleteTodo } from '../controllers/todos.js';

const router = express.Router();

router.post('/', createTodo);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;