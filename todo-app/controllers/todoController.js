import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({ task: req.body.task });
    const saved = await newTodo.save();
    res.json(saved);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { task: req.body.task },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Update failed" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Delete failed" });
  }
};
