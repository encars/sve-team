import './globals.css';
import { Roboto } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { Providers } from '@/providers/Providers';

const roboto = Roboto({ subsets: ['latin'], weight: "400" })

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
			<body className={roboto.className}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
