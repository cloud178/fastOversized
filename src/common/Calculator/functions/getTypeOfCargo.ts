// import { VehicleType } from "../Calculator";

// export type TypeOfCargoType =
//     | "груз габаритный"
//     | "груз негабаритный"
//     | "не сможем предложить"
//     | null;

// const getTypeOfCargo = (
//     typeOfVehicle: VehicleType,
//     length: number,
//     width: number,
//     height: number,
//     weight: number
// ): string => {
//     switch (typeOfVehicle) {
//         case "Тент":
//             return "груз габаритный";
//         case "Мега":
//             return "груз габаритный";
//         case "Длинномер":
//             return "груз габаритный";
//         case "Мега разборная":
//             if (width > 2550 || height > 2940 || length > 14600) {
//                 return "груз негабаритный";
//             }
//             return "груз габаритный";
//         case "Юмба":
//             if (width > 2550 || height > 3100 || length > 10600) {
//                 return "груз негабаритный";
//             }
//             return "груз габаритный";
//         case "Площадка":
//             if (
//                 width > 2550 ||
//                 height > 3200 ||
//                 length > 10600 ||
//                 weight > 24000
//             ) {
//                 return "груз негабаритный";
//             }
//             return "груз габаритный";
//         case "Тифбет":
//             if (width > 2550 || height > 3650 || length > 7900) {
//                 return "груз негабаритный";
//             }
//             return "груз габаритный";
//         case "не сможем предложить":
//             return "не сможем предложить";
//         default:
//             return "груз габаритный";
//     }
//     return "ошибка, такое значение не должно было показаться";
// };
