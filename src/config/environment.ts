import dotenv from 'dotenv';

dotenv.config();

const {
	MONGODB_URL,
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
	RANDOM_AVATAR,
} = process.env;
export const Environment = {
	db: `${MONGODB_URL}`,
	accessTokenSecret: `${ACCESS_TOKEN_SECRET}`!,
	refreshTokenSecret: `${REFRESH_TOKEN_SECRET}`!,
	randomAvatar: `${RANDOM_AVATAR}`,
};
