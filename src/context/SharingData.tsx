import { createContext, useEffect, useState } from "react";
import SVGApi from "../assets/0-floor.svg";

/*  Creating context to controll the SVG element between all componets in the app */
export const SVGContext = createContext<HTMLElement | undefined>(undefined);

function ControllingSVG({ children }: { children: React.ReactNode }) {
	// useState to contrlling SVG in the app
	const [svgElement, setSvgElement] = useState<HTMLElement | undefined>(
		undefined
	);

	useEffect(() => {
		// Fetching the svg element and pasring it from string to html element
		fetch(SVGApi)
			.then((res) => res.text())
			.then((svgText) => {
				const parser = new DOMParser();
				setSvgElement(
					parser.parseFromString(svgText, "image/svg+xml")
						.documentElement
				);
			});
	}, []);

	return (
		<SVGContext.Provider value={svgElement}>{children}</SVGContext.Provider>
	);
}

export default ControllingSVG;
