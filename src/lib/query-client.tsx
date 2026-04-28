"use client";

import LogActivityModal from "@/components/LogActivityModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

interface LogActivityCtx {
	openLogActivity: (challengeId?: string) => void;
}

const LogActivityContext = createContext<LogActivityCtx>({
	openLogActivity: () => {},
});

export const useLogActivity = () => useContext(LogActivityContext);

export function ReactQueryProvider({
	children,
}: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: { queries: { staleTime: 60 * 1000 } },
			}),
	);
	const [logOpen, setLogOpen] = useState(false);
	const [selectedChallengeId, setSelectedChallengeId] = useState<
		string | undefined
	>();

	const openLogActivity = (challengeId?: string) => {
		setSelectedChallengeId(challengeId);
		setLogOpen(true);
	};

	return (
		<LogActivityContext.Provider value={{ openLogActivity }}>
			<QueryClientProvider client={queryClient}>
				{children}
				{logOpen && (
					<LogActivityModal
						challengeId={selectedChallengeId}
						onClose={() => setLogOpen(false)}
					/>
				)}
			</QueryClientProvider>
		</LogActivityContext.Provider>
	);
}
