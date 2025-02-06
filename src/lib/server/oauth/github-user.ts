export interface GitHubUser {
	id: number;
	/**
	 * GitHub Username
	 */
	login: string;
	/**
	 * URL pointing to the profile picture
	 */
	avatar_url: string;
	name: string;
}
