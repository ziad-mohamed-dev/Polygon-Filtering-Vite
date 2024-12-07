import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SharingData from "./context/SharingData.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* Wrapping all the app in the sharing data context 
		to share the svg element and polygons's data bettween all components */}
		<SharingData>
			<App />
		</SharingData>
	</StrictMode>
);
