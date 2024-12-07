import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ControllingSVG from "./context/SharingData.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* Wrapping all the app in the ControllingSVG context
		to share the svg element bettween all components */}
		<ControllingSVG>
			<App />
		</ControllingSVG>
	</StrictMode>
);
