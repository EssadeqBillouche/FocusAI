import { getDashboardStatsService } from '../services/task.service.js';

export const getDashboardStats = async (req, res, next) => {
	try {
		const stats = await getDashboardStatsService(req.user._id);

		return res.status(200).json({
			status: 'success',
			data: { stats },
		});
	} catch (error) {
		next(error);
	}
};
