export type Role = 'admin' | 'moderator' | 'user';

export function hasAccess(role: Role) {
	return role;
}
