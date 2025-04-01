import { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapComponent = ({ addresses, titles, centerAddress }) => {
    const [coordinates, setCoordinates] = useState([]);
    const [center, setCenter] = useState([55.751244, 37.618423]); // Москва по умолчанию

    useEffect(() => {
        const fetchCoordinates = async () => {
            const geocodedCoords = await Promise.all(
                addresses.map(async (address) => {
                    try {
                        const response = await fetch(
                            `https://geocode-maps.yandex.ru/1.x/?apikey=158182c0-83bc-4116-994d-7433c95bb7a3&format=json&geocode=${encodeURIComponent(address)}`
                        );
                        const data = await response.json();

                        if (!data.response?.GeoObjectCollection?.featureMember?.length) {
                            console.warn(`Адрес не найден: ${address}`, data);
                            return null;
                        }

                        const pos = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ");
                        return [parseFloat(pos[1]), parseFloat(pos[0])];
                    } catch (error) {
                        console.error("Ошибка при геокодировании:", error);
                        return null;
                    }
                })
            );

            const filteredCoords = geocodedCoords.filter(Boolean);
            setCoordinates(filteredCoords);

            if (centerAddress) {
                const selectedIndex = addresses.indexOf(centerAddress);
                if (selectedIndex !== -1 && filteredCoords[selectedIndex]) {
                    setCenter(filteredCoords[selectedIndex]);
                }
            } else if (filteredCoords.length) {
                setCenter(filteredCoords[0]);
            }
        };

        fetchCoordinates();
    }, [addresses, centerAddress]);

    return (
        <YMaps>
            <Map state={{ center, zoom: 10 }} width="600px" height="400px">
                {coordinates.map((coord, index) => (
                    <Placemark
                        key={index}
                        geometry={coord}
                        properties={{
                            balloonContentHeader: `<strong>${titles[index]}</strong>`,
                            balloonContentBody: `Адрес: ${addresses[index]}`
                        }}
                        options={{
                            balloonMaxWidth: 200,
                            preset: "islands#redIcon" // Меняем стиль точки, если нужно
                        }}
                    />
                ))}
            </Map>
        </YMaps>
    );
};

export default MapComponent;








