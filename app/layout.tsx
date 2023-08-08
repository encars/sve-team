import './globals.css';
import { Roboto } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/Navbar';
import getCurrentUser from '@/actions/getCurrentUser';
import AuthContext from '@/context/AuthContext';

const roboto = Roboto({ subsets: ['latin'], weight: "400" })

export const metadata = {
	title: 'SVE',
	description: 'SVE Floorball',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<AuthContext>
					{children}
					<Toaster />
				</AuthContext>
			</body>
		</html>
	)
}
