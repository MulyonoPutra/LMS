export const hideUserProps = [
	'-password',
	'-createdAt',
	'-updatedAt',
	'-refreshToken',
	'-__v',
	'-images',
];
export const categoryPopulated = { path: 'category', select: '-__v' };
export const shelfPopulated = { path: 'shelf', select: ['-book', '-__v'] };
export const borrowPopulated = { path: 'borrow', select: ['-book', '-__v'] };
export const userPopulated = {
	path: 'user',
	select: [
		'-password',
		'-createdAt',
		'-updatedAt',
		'-refreshToken',
		'-__v',
		'-images',
	],
};

export const bookPopulated = {
	path: 'book',
	populate: [
		{ path: 'category', select: '-__v' },
		{ path: 'shelf', select: ['-book', '-__v'] },
	],
	select: '-__v',
};
