import { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapComponent = ({ addresses, titles, centerAddress }) => {
    const [coordinates, setCoordinates] = useState([]);
    const [center, setCenter] = useState([55.751244, 37.618423]); // Москва по умолчанию
    const [mapInstance, setMapInstance] = useState(null);
    const apiKey = "0202c11e-dc17-4344-8864-88e3386584d2";

    useEffect(() => {
        const fetchCoordinates = async () => {
            const geocodedCoords = await Promise.all(
                addresses.map(async (address) => {
                    try {
                        const response = await fetch(
                            `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${encodeURIComponent(address)}`
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

            if (filteredCoords.length > 0) {
                if (centerAddress) {
                    const selectedIndex = addresses.indexOf(centerAddress);
                    if (selectedIndex !== -1 && filteredCoords[selectedIndex]) {
                        setCenter(filteredCoords[selectedIndex]); // Фокус на выбранный объект
                    } else {
                        setCenter(filteredCoords[0]); // Фокус на первый объект, если не найден
                    }
                } else {
                    setCenter(filteredCoords[0]); // Устанавливаем первый объект как центр
                }
            }
        };

        fetchCoordinates();
    }, [addresses, centerAddress]);

    return (
        <YMaps>
            <Map
                state={{ center, zoom: 10 }}
                width="100%"
                height="100%"
                instanceRef={(ref) => setMapInstance(ref)}
            >
                {coordinates.map((coord, index) => (
                    <Placemark
                        key={index}
                        geometry={coord}
                        properties={{
                            hintContent: titles[index], // Всплывающая подсказка при наведении
                            balloonContentHeader: `<b>${titles[index]}</b>`, // Заголовок балуна
                            balloonContentBody: `<p>${addresses[index]}</p>` // Тело балуна
                        }}
                        options={{
                            preset: "islands#blueDotIcon" // Синий маркер (стандартный стиль)
                        }}
                        onClick={(e) => {
                            const placemark = e.get("target");
                            if (mapInstance) {
                                mapInstance.balloon.open(placemark.geometry.getCoordinates(), {
                                    contentHeader: `<b>${titles[index]}</b>`,
                                    contentBody: `<p>${addresses[index]}</p>`,
                                });
                            }
                        }}
                    />
                ))}
            </Map>
        </YMaps>
    );
};

export default MapComponent;










