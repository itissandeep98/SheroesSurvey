export const apiUrl =
	process.env.NODE_ENV === 'production'
		? 'https://sheroes-form.herokuapp.com'
		: 'http://127.0.0.1:8000';

export const frontUrl =
	process.env.NODE_ENV === 'production'
		? 'https://sheroes.pages.dev'
		: 'http://127.0.0.1:3000';