import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import getUser from '@/actions/getUser';

export const metadata = {
	title: 'SVE - Floorball',
	description: 'Members lounge',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await getUser();

	if (!user) {
		return redirect("/");
	}

	return (
		<>
			<Navbar user={user!} />
			{children}
		</>
	)
}
