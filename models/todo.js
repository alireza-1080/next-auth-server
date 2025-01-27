import mongoos from 'mongoose';

const todoSchema = new mongoos.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoos.Schema.Types.ObjectId,
      required: [true, 'Please provide a user'],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoos.model('Todo', todoSchema);

export default Todo;
