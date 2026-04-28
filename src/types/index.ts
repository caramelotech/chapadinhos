export type ChallengeMode = "competitive" | "casual";
export type ChallengeStatus = "draft" | "active" | "finished";
export type ChallengeVisibility = "public" | "private";

export interface User {
	id: string;
	name: string;
	username: string;
	bio: string;
	streak: number;
	totalActivities: number;
}

export interface Challenge {
	id: string;
	name: string;
	description: string;
	mode: ChallengeMode;
	weekly_goal_count?: number;
	min_activity_duration_minutes: number;
	start_date: string;
	end_date: string;
	status: ChallengeStatus;
	visibility: ChallengeVisibility;
	participants: number;
	myPoints: number;
	myStreak: number;
}

export interface Reaction {
	emoji: string;
	count: number;
	reacted: boolean;
}

export interface Comment {
	user: string;
	text: string;
	time: string;
}

export interface FeedItem {
	id: string;
	user: { name: string; username: string };
	activity_type: string;
	duration_minutes: number;
	notes: string | null;
	date: string;
	time: string;
	challenge_id: string | null;
	reactions: Reaction[];
	comments: Comment[];
	showComments: boolean;
}

export interface LeaderboardEntry {
	rank: number;
	user: { name: string; username: string };
	points: number;
	streak: number;
	isMe: boolean;
}

export interface WeekDay {
	day: string;
	date: number;
	done: boolean;
	today?: boolean;
}
