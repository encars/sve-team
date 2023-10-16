import Auth from "@/components/Auth";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const HomePage = async () => {
	const session = await getServerSession(authOptions);

	if (session) {
		console.log(session);
		redirect("/dashboard");
	}
	
	return (
		<div className="flex justify-center items-center h-screen overflow-y-hidden bg-primary">
			<Auth />
		</div>
	)
}

export default HomePage;