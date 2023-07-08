import getCurrentUser from "@/actions/getCurrentUser";
import Auth from "@/components/Auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
	const currentUser = await getCurrentUser();

	if (currentUser) {
		redirect("/dashboard");
	}
	
	return (
		<div className="flex justify-center items-center h-screen overflow-y-hidden bg-primary">
			<Auth />
		</div>
	)
}

export default HomePage;