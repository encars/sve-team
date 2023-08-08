import Navbar from '@/components/Navbar';
import getCurrentUser from '@/actions/getCurrentUser';

export const metadata = {
	title: 'SVE - Floorball',
	description: 'Members lounge',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const currentUser = await getCurrentUser();

	return (
		<>
			<Navbar currentUser={currentUser} />
			{children}
		</>
	)
}
