import { PanelRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const Sidebar = () => {
	return (
		<div>
			{/* Floating button - toggle sidebar */}
			<Button className="fixed bottom-4 right-4 size-12 flex justify-center items-center rounded-full bg-primary text-white shadow-lg">
				<PanelRight />
			</Button>
		</div>
	);
};

export default Sidebar;
