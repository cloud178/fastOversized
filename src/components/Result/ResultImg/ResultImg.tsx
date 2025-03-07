import tent from './../../../assets/photoOfVehiclesWEBP/tent.webp'
import dlinomer from './../../../assets/photoOfVehiclesWEBP/dlinomer.webp'
import jumbo from './../../../assets/photoOfVehiclesWEBP/jumbo.webp'
import mega from './../../../assets/photoOfVehiclesWEBP/mega.webp'
import ploshchadka from './../../../assets/photoOfVehiclesWEBP/ploschadka.webp'
import tiefbett from './../../../assets/photoOfVehiclesWEBP/tiefbett.webp'
import pilotFront from "./../../../assets/photoOfPilotsWEBP/pilotfront.webp"
import pilotBack from "./../../../assets/photoOfPilotsWEBP/pilotback.webp"

type ResultImgType = {
    vehicleType: string
    pilots: string
};

export const ResultImg = ({ vehicleType, pilots }: ResultImgType) => {
    return (
        <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {vehicleType === "Тент" && (
                <img
                    src={tent}
                    alt="tent"
                    style={{ width: "800px", height: "100%" }}
                />
            )}
            {vehicleType === "Мега" && (
                <img
                    src={mega}
                    alt="mega"
                    style={{ width: "800px", height: "100%" }}
                />
            )}
            {vehicleType === "Мега разборная" && (
                <img
                    src={mega}
                    alt="mega"
                    style={{ width: "800px", height: "100%" }}
                />
            )}
            {vehicleType === "Длинномер" && (
                <img
                    src={dlinomer}
                    alt="dlinomer"
                    style={{ width: "800px", height: "100%" }}
                />
            )}
            {vehicleType === "Юмба" && (
                <img
                    src={jumbo}
                    alt="jumbo"
                    style={{ width: "800px", height: "100%" }}
                />
            )}
            {vehicleType === "Площадка" && (
                <img
                    src={ploshchadka}
                    alt="ploshchadka"
                    style={{ width: "800px", height: "100%" }}
                />
            )}
            {vehicleType === "Тифбет" && (
                <img
                    src={tiefbett}
                    alt="tiefbett"
                    style={{ width: "800px", height: "100%" }}
                />
            )}
            {
                ['РФ', 'КЗ', 'РБ'].some(country => pilots.includes(country)) && (
                    <div>
                        <img
                            src={pilotFront}
                            alt="pilot front"
                            style={{ width: "300px", height: "100%" }}
                        />
                        <img
                            src={pilotBack}
                            alt="pilot back"
                            style={{ width: "300px", height: "100%" }}
                        />
                    </div>
                )
            }
        </div>
    );
};
