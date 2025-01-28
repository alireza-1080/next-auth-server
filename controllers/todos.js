import Todo from "../models/todo.js";
import idValidator from "../validators/idValidator.js";
import titleValidator from "../validators/titleValidator.js";
import User from "../models/user.js";

const createTodo = async (req, res) => {
    try{

        //^ Get the title and user from req.body
        let { title, user } = req.body;
        
        //^ Check if the title is valid
        title = titleValidator(title);
        
        //^ Check if the user id is valid
        user = idValidator(user);

        //^ Check if the user exists
        let isUserValid = await User.findById(user);

        //^ If user does not exist, throw an error
        if (!isUserValid) {
            throw new Error("User does not exist");
        }
        
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

const updateTodo = async (req, res) => {
    try {
        //^ Get the id from request params
        let { id } = req.params;

        //^ Get the id and isCompleted from req.body
        let { isCompleted, title } = req.body;

        //^ Check if the id is valid
        id = idValidator(id);

        //^ Check if the title is valid
        title = titleValidator(title);

        //^ Check if the isCompleted is boolean
        if (typeof isCompleted !== "boolean") {
            throw new Error("Please provide a valid isCompleted");
        }

        //^ Check if todo exists
        let todo = await Todo.findById(id);

        //^ If todo does not exist, throw an error
        if (!todo) {
            throw new Error("Todo does not exist");
        }

        //^ Update the todo
        await Todo.findByIdAndUpdate(id, { isCompleted, title });

        //^ Send the success response
        return res.status(200).json("Todo updated successfully");
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        //^ Get the id from request params
        let { id } = req.params;

        //^ Check if the id is valid
        id = idValidator(id);

        //^ Check if todo exists
        let todo = await Todo.findById(id);

        //^ If todo does not exist, throw an error
        if (!todo) {
            throw new Error("Todo does not exist");
        }

        //^ Delete the todo
        await Todo.findByIdAndDelete(id);

        //^ Send the success response
        return res.status(200).json("Todo deleted successfully");
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export { createTodo, updateTodo, deleteTodo };
