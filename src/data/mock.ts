import type {
	Challenge,
	FeedItem,
	LeaderboardEntry,
	User,
	WeekDay,
} from "@/types";

export const CURRENT_USER: User = {
	id: "u1",
	name: "Mateus Ferreira",
	username: "mferreira",
	bio: "Sempre em movimento",
	streak: 4,
	totalActivities: 47,
};

export const CHALLENGES: Challenge[] = [
	{
		id: "c1",
		name: "Abril Chapado",
		description:
			"3 atividades por semana durante abril. Vence quem mantiver o maior streak!",
		mode: "casual",
		weekly_goal_count: 3,
		min_activity_duration_minutes: 30,
		start_date: "2026-04-01",
		end_date: "2026-04-30",
		status: "active",
		visibility: "private",
		participants: 6,
		myPoints: 3,
		myStreak: 4,
	},
	{
		id: "c2",
		name: "Correr Julho",
		description: "Máximo de corridas em julho. Sem limite diário!",
		mode: "competitive",
		min_activity_duration_minutes: 20,
		start_date: "2026-07-01",
		end_date: "2026-07-31",
		status: "draft",
		visibility: "private",
		participants: 4,
		myPoints: 0,
		myStreak: 0,
	},
];

export const LEADERBOARD: LeaderboardEntry[] = [
	{
		rank: 1,
		user: { name: "Ana Lima", username: "analima" },
		points: 4,
		streak: 4,
		isMe: false,
	},
	{
		rank: 2,
		user: { name: "Mateus Ferreira", username: "mferreira" },
		points: 3,
		streak: 4,
		isMe: true,
	},
	{
		rank: 3,
		user: { name: "Pedro Costa", username: "pedrocosta" },
		points: 3,
		streak: 3,
		isMe: false,
	},
	{
		rank: 4,
		user: { name: "Julia Rocha", username: "juliarocha" },
		points: 2,
		streak: 2,
		isMe: false,
	},
	{
		rank: 5,
		user: { name: "Carlos M.", username: "carlosm" },
		points: 1,
		streak: 1,
		isMe: false,
	},
	{
		rank: 6,
		user: { name: "Fernanda S.", username: "fernandas" },
		points: 1,
		streak: 1,
		isMe: false,
	},
];

export const FEED: FeedItem[] = [
	{
		id: "f1",
		user: { name: "Ana Lima", username: "analima" },
		activity_type: "Musculação",
		duration_minutes: 60,
		notes: "Treino de costas e bíceps. Focada hoje!",
		date: "2026-04-27",
		time: "agora",
		challenge_id: "c1",
		reactions: [
			{ emoji: "🔥", count: 4, reacted: false },
			{ emoji: "💪", count: 2, reacted: true },
		],
		comments: [{ user: "mferreira", text: "Arrasou demais!", time: "5min" }],
		showComments: false,
	},
	{
		id: "f2",
		user: { name: "Pedro Costa", username: "pedrocosta" },
		activity_type: "Corrida",
		duration_minutes: 45,
		notes: "8km na orla. Tempo bom hoje",
		date: "2026-04-27",
		time: "2h",
		challenge_id: "c1",
		reactions: [
			{ emoji: "🔥", count: 6, reacted: false },
			{ emoji: "👏", count: 3, reacted: false },
		],
		comments: [],
		showComments: false,
	},
	{
		id: "f3",
		user: { name: "Mateus Ferreira", username: "mferreira" },
		activity_type: "Funcional",
		duration_minutes: 50,
		notes: "Circuito de 5 rounds. Devastador.",
		date: "2026-04-26",
		time: "ontem",
		challenge_id: "c1",
		reactions: [
			{ emoji: "🔥", count: 5, reacted: false },
			{ emoji: "😤", count: 2, reacted: false },
		],
		comments: [
			{ user: "analima", text: "Monstro!", time: "18h" },
			{ user: "juliarocha", text: "Que disposição hein", time: "20h" },
		],
		showComments: false,
	},
	{
		id: "f4",
		user: { name: "Julia Rocha", username: "juliarocha" },
		activity_type: "Yoga",
		duration_minutes: 40,
		notes: null,
		date: "2026-04-26",
		time: "ontem",
		challenge_id: "c1",
		reactions: [{ emoji: "🧘", count: 3, reacted: false }],
		comments: [],
		showComments: false,
	},
];

export const WEEK_CALENDAR: WeekDay[] = [
	{ day: "S", date: 21, done: true },
	{ day: "T", date: 22, done: true },
	{ day: "Q", date: 23, done: false },
	{ day: "Q", date: 24, done: true },
	{ day: "S", date: 25, done: false },
	{ day: "S", date: 26, done: true },
	{ day: "D", date: 27, done: false, today: true },
];

export const ACTIVITY_TYPES = [
	"Musculação",
	"Corrida",
	"Caminhada",
	"Ciclismo",
	"Natação",
	"Pilates",
	"Yoga",
	"Funcional",
	"Artes Marciais",
	"Esportes Coletivos",
	"Outro",
];

export const ACTIVITY_ICONS: Record<string, string> = {
	Musculação: "🏋️",
	Corrida: "🏃",
	Caminhada: "🚶",
	Ciclismo: "🚴",
	Natação: "🏊",
	Pilates: "🧘",
	Yoga: "🧘",
	Funcional: "⚡",
	"Artes Marciais": "🥋",
	"Esportes Coletivos": "⚽",
	Outro: "💪",
};
