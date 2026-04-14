import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MainLayout from "@/components/MainLayout";
import { ReactQueryProvider } from "@/lib/query-client";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Chapadinhos",
	description: "Desafios de atividade física entre amigos",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${spaceGrotesk.variable} ${inter.variable} font-body`}>
				<ReactQueryProvider>
					<Header />
					<MainLayout>{children}</MainLayout>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
