import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as topojson from "topojson-client";
import { Mercator } from "@visx/geo";

// Etnik gruplar ve onların karşılık geldiği ülkeler
const ethnicRegions = {
  White: [
    "Germany",
    "France",
    "United Kingdom",
    "Netherlands",
    "Belgium",
    "Switzerland",
    "Austria",
    "Norway",
    "Sweden",
    "Denmark",
    "Finland",
    "Iceland",
    "Poland",
    "Czech Republic",
    "Slovakia",
    "Hungary",
    "Russia",
    "Ukraine",
    "Lithuania",
    "Latvia",
    "Estonia",
    "Italy",
    "Spain",
    "Portugal",
    "Greece",
    "United States",
    "Canada",
    "Australia",
    "New Zealand",
  ],
  Black: [
    "Nigeria",
    "Ghana",
    "Senegal",
    "Ivory Coast",
    "Ethiopia",
    "Kenya",
    "Tanzania",
    "Uganda",
    "Democratic Republic of the Congo",
    "Cameroon",
    "Gabon",
    "South Africa",
    "Zimbabwe",
    "Mozambique",
    "Jamaica",
    "Haiti",
    "Dominican Republic",
    "Trinidad and Tobago",
    "Brazil",
    "United States",
    "Colombia",
    "Cuba",
  ],
  Latino_Hispanic: [
    "Argentina",
    "Chile",
    "Brazil",
    "Peru",
    "Venezuela",
    "Colombia",
    "Mexico",
    "Guatemala",
    "El Salvador",
    "Honduras",
    "Nicaragua",
    "Costa Rica",
    "Panama",
    "Cuba",
    "Dominican Republic",
    "Puerto Rico",
  ],
  East_Asian: [
    "China",
    "Japan",
    "South Korea",
    "North Korea",
    "Taiwan",
    "Mongolia",
  ],
  Southeast_Asian: [
    "Thailand",
    "Philippines",
    "Vietnam",
    "Indonesia",
    "Malaysia",
    "Myanmar",
    "Cambodia",
    "Laos",
    "Singapore",
    "Brunei",
    "Timor-Leste",
  ],
  Indian: [
    "India",
    "Pakistan",
    "Bangladesh",
    "Sri Lanka",
    "Nepal",
    "Bhutan",
    "Maldives",
  ],
  Middle_Eastern: [
    "Saudi Arabia",
    "United Arab Emirates",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
    "Yemen",
    "Lebanon",
    "Syria",
    "Jordan",
    "Palestine",
    "Israel",
    "Iraq",
    "Iran",
    "Turkey",
    "Egypt",
  ],
};

// Etnik gruplara karşılık gelen renkler
const ethnicityColors = {
  White: "rgba(255, 0, 0, 0.7)", // Kırmızı
  Black: "rgba(255, 165, 0, 0.7)", // Turuncu
  Latino_Hispanic: "rgba(255, 223, 0, 0.7)", // Sarı
  East_Asian: "rgba(0, 128, 0, 0.7)", // Yeşil
  Southeast_Asian: "rgba(0, 255, 255, 0.7)", // Açık Mavi
  Indian: "rgba(0, 0, 255, 0.7)", // Mavi
  Middle_Eastern: "rgba(128, 0, 128, 0.7)", // Mor
};

const EthnicityMap = ({
  height,
  width,
}: {
  width?: number;
  height?: number;
}) => {
  const [geoFeatures, setGeoFeatures] = useState<
    GeoJSON.FeatureCollection | any
  >([]);
  const [scale, setScale] = useState(200);
  const [translate, setTranslate] = useState<[number, number]>([520, 340]);
  const [dragging, setDragging] = useState(false);
  const [startCoords, setStartCoords] = useState<[number, number]>([0, 0]);

  const mapRef = useRef<SVGSVGElement | null>(null);

  // Fetch GeoJSON data
  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const { data } = await axios.get(
          "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json"
        );
        const geoJSON = topojson.feature(
          data,
          data.objects.countries
        ) as unknown as GeoJSON.FeatureCollection;
        setGeoFeatures(geoJSON.features || []);
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    };

    fetchGeoJSON();
  }, []);

  // Event handlers for dragging
  const onMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setDragging(true);
    setStartCoords([e.clientX, e.clientY]);
  };

  const onMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragging) return;

    const dx = e.clientX - startCoords[0];
    const dy = e.clientY - startCoords[1];
    setTranslate([translate[0] + dx, translate[1] + dy]);
    setStartCoords([e.clientX, e.clientY]);
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  // Touch events for mobile dragging
  const onTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    setDragging(true);
    const touch = e.touches[0];
    setStartCoords([touch.clientX, touch.clientY]);
  };

  const onTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!dragging) return;

    const touch = e.touches[0];
    const dx = touch.clientX - startCoords[0];
    const dy = touch.clientY - startCoords[1];
    setTranslate([translate[0] + dx, translate[1] + dy]);
    setStartCoords([touch.clientX, touch.clientY]);
  };

  const onTouchEnd = () => {
    setDragging(false);
  };

  // Etnik grup için renk hesaplama fonksiyonu
  const getEthnicityColorForRegion = (countryName: string): string => {
    let ethnicityRegion: string | null = null;

    // Ülkenin etnik grup kategorisini bul
    Object.keys(ethnicRegions).forEach((region) => {
      if (
        (
          ethnicRegions[region as keyof typeof ethnicRegions] as string[]
        ).includes(countryName)
      ) {
        ethnicityRegion = region;
      }
    });

    return ethnicityRegion
      ? ethnicityColors[ethnicityRegion]
      : "rgba(128, 128, 128, 0.1)"; // Varsayılan gri
  };

  return (
    <div className="bg-gray-900/60 order-1 sm:order-2 w-full">
      <svg
        ref={mapRef}
        className="min-h-[75vh] w-full h-full hover:cursor-move"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: "none" }} // Prevent touch zoom on mobile
      >
        <Mercator data={geoFeatures} scale={scale} translate={translate}>
          {(mercator) =>
            mercator.features.map(({ feature, path }, i) => {
              // Type guard to ensure feature has 'properties'
              if ("properties" in feature && feature.properties) {
                const countryName = feature.properties.name;
                const color = getEthnicityColorForRegion(countryName);

                return (
                  <path
                    key={`map-feature-${i}`}
                    d={path || ""}
                    fill={color || "#ffffff"}
                    stroke="#fff"
                    strokeWidth={0.5}
                  />
                );
              }

              return null; // If feature doesn't have 'properties', return null.
            })
          }
        </Mercator>
      </svg>
    </div>
  );
};

export default EthnicityMap;
