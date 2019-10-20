function handleError(fn) {
	return function(...params) {
		const [req, res, next] = params;
		return fn(...params).catch(err => {
			return res.status(400).json({
				message: err.message
			});
		});
	};
}

module.exports = {
	handleError
};
