import { useContext, useEffect, useState } from "react";
import "./polygonDetails.css";
import { polygonDataType, polygonDetailsStateType } from "../../types/types";
import { dataContext } from "../../context/SharingData";

function PolygonDetails() {
	const { svgElement, polygonsData } = useContext(dataContext);
	// managing polygon details 's postion, visability, price, number and content
	const [polygonDetailsState, setPolygonDetailsState] =
		useState<polygonDetailsStateType>({
			visable: false,
			X: 0,
			Y: 0,
			unit: 0,
			price: 0,
			availability: "",
		});
	const { visable, X, Y, unit, price, availability } = polygonDetailsState;

	// Polygon details is width when it is on small screen sizes or others screen sizes
	enum PolygonDetailsSizes {
		mobileSize = 180,
		otherSizes = 210,
	}

	// Function to show the user the polygons details
	function showPolygonDetails(
		polygonData: polygonDataType,
		currentPolygon: SVGElement
	) {
		const { x, width, y } = currentPolygon.getBoundingClientRect();
		const windowWidth = window.innerWidth;
		const mediumScreenWidth = 481;
		/* this if conditions to make the polygon details responsive 
		on all devices and not getting out from the user's screan */
		if (windowWidth < mediumScreenWidth) {
			const responsivePolygonDetails =
				x + width + PolygonDetailsSizes.mobileSize > windowWidth;
			setPolygonDetailsState({
				visable: true,
				X: responsivePolygonDetails
					? x - PolygonDetailsSizes.mobileSize
					: x + width,
				Y: y,
				unit: polygonData.code,
				price: polygonData.price,
				availability: polygonData.status,
			});
		} else {
			const responsivePolygonDetails =
				x + width + PolygonDetailsSizes.otherSizes > windowWidth;
			setPolygonDetailsState({
				visable: true,
				X: responsivePolygonDetails
					? x - PolygonDetailsSizes.otherSizes
					: x + width,
				Y: y,
				unit: polygonData.code,
				price: polygonData.price,
				availability: polygonData.status,
			});
		}
	}
	// handel hide the polyDetailsFuction
	function hidePolygonDetails() {
		setPolygonDetailsState({
			visable: false,
			X: 0,
			Y: 0,
			unit: 0,
			price: 0,
			availability: "",
		});
	}

	useEffect(() => {
		if (svgElement && polygonsData.length !== 0) {
			// Adding event to every polygon to make it's details appears when hover
			polygonsData.forEach((polygonData: polygonDataType) => {
				const currentPolygon = svgElement.querySelector(
					`polygon[data-code="${polygonData.code}"]`
				) as SVGElement;
				const mouseEnterHandler = showPolygonDetails.bind(
					null,
					polygonData,
					currentPolygon
				);
				currentPolygon.addEventListener("mouseenter", mouseEnterHandler);
			});
			// Cleanup fuction for events fired when unamount polygonDetails Component
			return () => {
				// Remove polygons events listener
				polygonsData.forEach((polygonData: polygonDataType) => {
					const currentPolygon = svgElement.querySelector(
						`polygon[data-code="${polygonData.code}"]`
					) as SVGElement;
					const mouseEnterHandler = showPolygonDetails.bind(
						null,
						polygonData,
						currentPolygon
					);
					currentPolygon.removeEventListener(
						"mouseenter",
						mouseEnterHandler
					);
				});
			};
		}
	}, [svgElement, polygonsData]);

	return (
		visable && (
			<div
				className="polygon-details-container"
				style={{ left: `${X}px`, top: `${Y}px` }}
			>
				<button
					className="close-btn"
					onClick={hidePolygonDetails}
				>
					X
				</button>
				<p>
					<span>Unit {unit}</span>
					<span className={`availability ${availability}`}>
						{availability}
					</span>
				</p>
				<p>
					<span>Price</span>
					<span>{price} EGP</span>
				</p>
				<button className="callback-btn">Callback</button>
			</div>
		)
	);
}

export default PolygonDetails;
