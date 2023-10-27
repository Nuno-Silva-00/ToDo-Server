import express from "express";
import { createToDo, getToDo, updateToDo, deleteToDo } from '../controllers/todo.controller.js'
const router = express.Router();

router.route('/create').post(createToDo);
router.route('/:id').get(getToDo);
router.route('/update/:id').patch(updateToDo);
router.route('/delete/"id').delete(deleteToDo)
export default router;