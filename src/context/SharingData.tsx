import { createContext, useEffect, useState } from "react";
import { polygonDataType } from "../types/types";

/*  Creating context to share the svg element and polygons's 
data between all componets in the app */
export const dataContext = createContext<{
	svgElement: HTMLElement | undefined;
	polygonsData: polygonDataType[] | never[];
}>({ svgElement: undefined, polygonsData: [] });

function SharingData({ children }: { children: React.ReactNode }) {
	// useState to handel storing data and state chaning in the app
	const [svgElement, setSvgElement] = useState<HTMLElement | undefined>(
		undefined
	);
	const [polygonsData, setPolygonsData] = useState<
		polygonDataType[] | never[]
	>([]);

	useEffect(() => {
		// Fetching the svg element and pasring it from string to html element
		fetch("/src/assets/0-floor.svg")
			.then((res) => res.text())
			.then((svgText) => {
				const parser = new DOMParser();
				setSvgElement(
					parser.parseFromString(svgText, "image/svg+xml")
						.documentElement
				);
			});
		// Fetching the polygons's data and converting it from json
		fetch("/src/assets/data.json")
			.then((res) => res.json())
			.then((data) => {
				setPolygonsData(data);
			});
	}, []);

	return (
		<dataContext.Provider value={{ svgElement, polygonsData }}>
			{children}
		</dataContext.Provider>
	);
}

export default SharingData;
