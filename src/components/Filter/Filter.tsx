import { useEffect, useRef, useState } from "react";
import "./filter.css";
import polygonsData from "../../assets/data.json";
import {
	findMaxPrice,
	fitlerPolygons,
	handelMaxInput,
	handelMinInput,
} from "../../utils/filterFunctionality";
import { SVGContext } from "../../context/SharingData";
import { useContext } from "react";

function Filter() {
	const svgElement = useContext(SVGContext);
	/* useStates to manage the polygons shown or hidden 
	according to the filter criteria set by the user */
	const [availability, setAvailability] = useState<string>("all");
	const [minCurrentValue, setMinCurrentValue] = useState<number>(0);
	const [maxCurrentValue, setMaxCurrentValue] = useState<number>(0);
	// Inputs maximum value
	const [maxPrice, setmaxPrice] = useState<number>(0);
	/* spanRef to hold or getting the span to controlling 
	the range bar between minimum and maximum price*/
	const spanRef = useRef<HTMLSpanElement>(null);
	// price gap 10% between minimum and maximum price
	const priceGap: number = parseInt(0.1 * maxPrice);

	useEffect(() => {
		/* Setting the Inputs maximum value and maximum price current 
		value with polygons's data */
		const getMaxPrice: number = findMaxPrice(polygonsData);
		setMaxCurrentValue(getMaxPrice);
		setmaxPrice(getMaxPrice);
	}, []);

	/* when the SVG element loaded and any of 
	the availability or minimum price or maximum price states changed 
	the polygons is filtered by filterPolygons function */
	useEffect((): void => {
		if (svgElement) {
			fitlerPolygons(
				polygonsData,
				availability,
				minCurrentValue,
				maxCurrentValue
			);
		}
	}, [availability, minCurrentValue, maxCurrentValue]);

	return (
		<div className="filter-container">
			<div className="availability-container">
				<p>Availability</p>
				<div className="availability-methods">
					<button
						className="all-btn"
						onClick={(e): void => {
							const btn: HTMLButtonElement =
								e.target as HTMLButtonElement;
							setAvailability(btn.innerHTML);
						}}
					>
						all
					</button>
					<button
						className="available-btn"
						onClick={(e): void => {
							const btn: HTMLButtonElement =
								e.target as HTMLButtonElement;
							setAvailability(btn.innerHTML);
						}}
					>
						available
					</button>
					<button
						className="reserved-btn"
						onClick={(e): void => {
							const btn: HTMLButtonElement =
								e.target as HTMLButtonElement;
							setAvailability(btn.innerHTML);
						}}
					>
						reserved
					</button>
					<button
						className="sold-btn"
						onClick={(e): void => {
							const btn: HTMLButtonElement =
								e.target as HTMLButtonElement;
							setAvailability(btn.innerHTML);
						}}
					>
						sold
					</button>
				</div>
			</div>
			<div className="price-filter">
				<div className="price-info">
					<p>price</p>
					<p>
						LE {minCurrentValue}.00 - {maxCurrentValue}.00
					</p>
				</div>
				<div className="input-container">
					<input
						type="range"
						min={0}
						max={maxPrice}
						value={minCurrentValue}
						onInput={(e: React.FormEvent<HTMLInputElement>) => {
							handelMinInput(
								e,
								setMinCurrentValue,
								maxCurrentValue,
								priceGap,
								maxPrice,
								spanRef
							);
						}}
					/>
					<input
						type="range"
						min={0}
						max={maxPrice}
						value={maxCurrentValue}
						onInput={(e: React.FormEvent<HTMLInputElement>) => {
							handelMaxInput(
								e,
								setMaxCurrentValue,
								minCurrentValue,
								priceGap,
								maxPrice,
								spanRef
							);
						}}
					/>
					<p>
						<span ref={spanRef}></span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Filter;
