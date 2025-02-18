// // common/Calculator/Calculator.ts
// import { DimensionsType, LocationType } from "../../App";

// export const calculateResult = (
//     dimensions: DimensionsType,
//     location: LocationType
// ): string => {
//     const width = +dimensions.width;
//     const height = +dimensions.height;
//     const length = +dimensions.length;
//     const weight = +dimensions.weight;

//     // Пример расчётов
//     if (!(width && height && length && weight)) {
//         return "введите все запрашиваемые параметры";
//     }

//     if (width < 2481) {
//         if (weight / length <= 4) {
//             if (weight < 22001) {
//                 if (height < 2941) {
//                     if (length < 13601) {
//                         return "груз габаритный";
//                     } else if (length > 13600 && length < 14600) {
//                         return "груз габаритный, требуется Мега разборная для свеса. Свес до метра. Спец разрешения и обозначение не требуется";
//                     } else if (length >= 14600 && length < 15600) {
//                         if (
//                             (location.fromLoc === "Алаш" ||
//                                 location.fromLoc === "Внутренний") &&
//                             location.toLoc === "КЗ"
//                         ) {
//                             return "надбавка на Мегу разборную - 1500е. Свес от метра до двух. Требуется обозначить свес табличкой";
//                         } else if (
//                             location.fromLoc === "Алаш" &&
//                             location.toLoc === "РФ"
//                         ) {
//                             return "надбавка на Мегу разборную - 1500e. Свес от метра до двух. Требуется обозначить свес табличкой. По РФ груз считается в габарите со свесом до двух метров";
//                         } else if (
//                             (location.fromLoc === "Внутренний" ||
//                                 location.fromLoc === "ЗБК") &&
//                             location.toLoc === "РФ"
//                         ) {
//                             return "На Мегу разборную. Свес до двух метров. Требуется обозначить свес табличкой. По РФ груз считается в габарите со свесом до двух метров";
//                         }
//                     } else if (length >= 15600 && length < 16900) {
//                         if (location.toLoc === "КЗ") {
//                             if (location.fromLoc === "Алаш") {
//                                 return "Площадка, 13000е";
//                             } else if (location.fromLoc === "Внутренний") {
//                                 return "Площадка, 17500e";
//                             }
//                         } else if (location.toLoc === "РФ") {
//                             if (location.fromLoc === "Алаш") {
//                                 return "Площадка, 15500е";
//                             } else if (location.fromLoc === "ЗБК") {
//                                 return "Площадка, 16500e";
//                             } else if (location.fromLoc === "Внутренний") {
//                                 return "Площадка, 19500e";
//                             }
//                         }
//                     } else if (length >= 16900 && length < 21001) {
//                         if (location.toLoc === "КЗ") {
//                             if (location.fromLoc === "Алаш") {
//                                 return "Площадка, 18250";
//                             } else if (location.fromLoc === "Внутренний") {
//                                 return "Площадка, 24250";
//                             }
//                         } else if (location.toLoc === "РФ") {
//                             if (location.fromLoc === "Алаш") {
//                                 return "Площадка, 21050e";
//                             } else if (location.fromLoc === "ЗБК") {
//                                 return "Площадка, 22100e";
//                             } else if (location.fromLoc === "Внутренний") {
//                                 return "Площадка, 26100e";
//                             }
//                         }
//                     }
//                 }
//             } else if (height < 3431) {
//                 if (length < 13601) {
//                     if (location.toLoc === "КЗ") {

//                     } else if (location.toLoc === "РФ") {

//                     }
//                 } else if (length > 13600 && length < 14600) {
//                     return "груз габаритный, требуется Мега разборная для свеса. Свес до метра. Спец разрешения и обозначение не требуется";
//                 } else if (length >= 14600 && length < 15600) {
//                     if (
//                         (location.fromLoc === "Алаш" ||
//                             location.fromLoc === "Внутренний") &&
//                         location.toLoc === "КЗ"
//                     ) {
//                         return "надбавка на Мегу разборную - 1500е. Свес от метра до двух. Требуется обозначить свес табличкой";
//                     } else if (
//                         location.fromLoc === "Алаш" &&
//                         location.toLoc === "РФ"
//                     ) {
//                         return "надбавка на Мегу разборную - 1500e. Свес от метра до двух. Требуется обозначить свес табличкой. По РФ груз считается в габарите со свесом до двух метров";
//                     } else if (
//                         (location.fromLoc === "Внутренний" ||
//                             location.fromLoc === "ЗБК") &&
//                         location.toLoc === "РФ"
//                     ) {
//                         return "На Мегу разборную. Свес до двух метров. Требуется обозначить свес табличкой. По РФ груз считается в габарите со свесом до двух метров";
//                     }
//                 } else if (length >= 15600 && length < 16900) {
//                     if (location.toLoc === "КЗ") {
//                         if (location.fromLoc === "Алаш") {
//                             return "Площадка, 13000е";
//                         } else if (location.fromLoc === "Внутренний") {
//                             return "Площадка, 17500e";
//                         }
//                     } else if (location.toLoc === "РФ") {
//                         if (location.fromLoc === "Алаш") {
//                             return "Площадка, 15500е";
//                         } else if (location.fromLoc === "ЗБК") {
//                             return "Площадка, 16500e";
//                         } else if (location.fromLoc === "Внутренний") {
//                             return "Площадка, 19500e";
//                         }
//                     }
//                 } else if (length >= 16900 && length < 21001) {
//                     if (location.toLoc === "КЗ") {
//                         if (location.fromLoc === "Алаш") {
//                             return "Площадка, 18250";
//                         } else if (location.fromLoc === "Внутренний") {
//                             return "Площадка, 24250";
//                         }
//                     } else if (location.toLoc === "РФ") {
//                         if (location.fromLoc === "Алаш") {
//                             return "Площадка, 21050e";
//                         } else if (location.fromLoc === "ЗБК") {
//                             return "Площадка, 22100e";
//                         } else if (location.fromLoc === "Внутренний") {
//                             return "Площадка, 26100e";
//                         }
//                     }
//                 }
//             }
//         }
//     } else if (width > 2480 && width < 2551) {
//     }
// };
