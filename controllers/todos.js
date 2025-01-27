import Todo from "../models/todo.js";
import idValidator from "../validators/idValidator.js";
import titleValidator from "../validators/titleValidator.js";

const createTodo = async (req, res) => {
    try{

        //^ Get the title and user from req.body
        let { title, user } = req.body;
        
        //^ Check if the title is valid
        title = titleValidator(title);
        
        //^ Check if the user id is valid
        user = idValidator(user);
        
        //^ Create a new todo
        let todo = new Todo({
            title,
            user,
        });

        //^ Save the todo to the database
        await todo.save();

        //^ Send the success response
        return res.status(201).json("Todo created successfully");
    }catch(error){
        return res.status(400).json({ error: error.message });
    }
};

const updateTodo = async (req, res) => {};

const deleteTodo = async (req, res) => {};

export { createTodo, updateTodo, deleteTodo };
