import { polygonDataType } from "../types/types";

// Finding the most high polygon's price in the data
export function findMaxPrice(data: polygonDataType[]) {
	let currentMax: number = 0;
	data.forEach((polygon: polygonDataType): void => {
		if (currentMax < polygon.price) currentMax = polygon.price;
	});
	return currentMax;
}

export function handelMinInput(
	e: React.FormEvent<HTMLInputElement>,
	setCurrentMinValue: React.Dispatch<React.SetStateAction<number>>,
	maxCurrentValue: number,
	priceGap: number,
	maxPrice: number,
	spanRef: React.RefObject<HTMLSpanElement>
): void {
	// The current value the user want to select it
	const inputCurrentValue = +(e.target as HTMLInputElement).value;
	if (spanRef.current) {
		/* If the gap between the value the user want to selecting it and the 
    maximum state is bigger than or equal price gap so set the minimum state 
    to the value the user want to selecting it */
		if (maxCurrentValue - inputCurrentValue >= priceGap) {
			setCurrentMinValue(inputCurrentValue);
			spanRef.current.style.left = `${
				(inputCurrentValue / maxPrice) * 100
			}%`;
			spanRef.current.style.width = `${
				((maxCurrentValue - inputCurrentValue) / maxPrice) * 100
			}%`;
		} else {
			/* If the gap between the value the user want to selecting it and the 
    maximum state is less than price gap so set the minimum state 
    to (maximum input value - price gap) */
			setCurrentMinValue(maxCurrentValue - priceGap);
			spanRef.current.style.left = `${
				((maxCurrentValue - priceGap) / maxPrice) * 100
			}%`;
			spanRef.current.style.width = `${(priceGap / maxPrice) * 100}%`;
		}
	}
}

export function handelMaxInput(
	e: React.FormEvent<HTMLInputElement>,
	setCurrentMaxValue: React.Dispatch<React.SetStateAction<number>>,
	minCurrentValue: number,
	priceGap: number,
	maxPrice: number,
	spanRef: React.RefObject<HTMLSpanElement>
): void {
	const inputCurrentValue = +(e.target as HTMLInputElement).value;
	if (spanRef.current) {
		/* If the gap between the value the user want to selecting it and the 
    minimum state is bigger than or equal price gap so set the maximum state 
    to the value the user want to selecting it */
		if (inputCurrentValue - minCurrentValue >= priceGap) {
			setCurrentMaxValue(inputCurrentValue);
			spanRef.current.style.width = `${
				((inputCurrentValue - minCurrentValue) / maxPrice) * 100
			}%`;
		} else {
			/* If the gap between the value the user want to selecting it and the 
    minimum state is less than price gap so set the maximum state 
    to (minimum input value + price gap) */
			setCurrentMaxValue(minCurrentValue + priceGap);
			spanRef.current.style.width = `${(priceGap / maxPrice) * 100}%`;
		}
	}
}

/*
Filtering polygons depending on the availability or miniumum 
or maximum price with adding or removing classes

show polygon when polygon's data is 
compatible with filter selected by the user
.all: #3271cc
.available: #23e282
.reserved: #fabc3f
.sold: #fa4032

hide the polygon when polygon's data isn't 
compatible with filter selected by the user
.hide: display: none
*/
export function fitlerPolygons(
	data: polygonDataType[],
	availability: string,
	minCurrentValue: number,
	maxCurrentValue: number
): void {
	data.forEach((polygon: polygonDataType): void => {
		const polygonElement: SVGPolygonElement = document.querySelector(
			`polygon[data-code="${polygon.code}"]`
		) as SVGPolygonElement;
		if (
			(polygon.status === availability || availability == "all") &&
			polygon.price >= minCurrentValue &&
			polygon.price <= maxCurrentValue
		) {
			polygonElement.classList.value = availability;
		} else {
			polygonElement.classList.value = "hide";
		}
	});
}
