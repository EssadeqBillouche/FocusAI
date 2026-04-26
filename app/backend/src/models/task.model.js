import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 120,
		},
		description: {
			type: String,
			trim: true,
			maxlength: 1000,
			default: '',
		},
		status: {
			type: String,
			enum: ['pending', 'completed'],
			default: 'pending',
		},
		priority: {
			type: String,
			enum: ['low', 'medium', 'high'],
			default: 'medium',
		},
		deadline: {
			type: Date,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

TaskSchema.index({ userId: 1, status: 1, priority: 1, deadline: 1 });

const Task = mongoose.model('Task', TaskSchema);

export default Task;
