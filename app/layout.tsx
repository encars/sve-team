import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Providers } from '@/providers/Providers';
import { GeistSans } from 'geist/font';

export const metadata = {
	title: 'SVE',
	description: 'SVE Floorball',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={GeistSans.className}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
