import { Environment } from '../config/environment';

export const avatarGenerator = () => {
	const random = (Math.random() + 1).toString(36).substring(7);
	return `${Environment.randomAvatar}/${random}`;
};
