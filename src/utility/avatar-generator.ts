import { Environment } from '../config/environment';

export const avatarGenerator = () => {
	let random = (Math.random() + 1).toString(36).substring(7);
	return `${Environment.randomAvatar}/${random}`;
};
