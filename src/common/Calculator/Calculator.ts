// common/Calculator/Calculator.ts
import { DimensionsType, LocationType } from "../../App";

export const answers = {
    cargoVGabe: "Груз с вышеуказанными параметрами считается в габарите",
    megaVGabe: "Нужна Мега разборная",
    Jumbo: "Нужна Юмба",
    megaOrJumbo: "Нужна Мега или Юмба",
    ploschadka: "Нужна Площадка",
    tiefbett: "Нужен Тифбет",
    bolshajaNagruzkaNaMetrPogonny: "Большая нагрузка на метр погонный",
    rfTenPercent: 'По РФ не считается нарушением превышение допустимых нагрузок и общего веса до 10%'
} as const;

export const calculateResult = (
    dimensions: DimensionsType,
    location: LocationType
): string => {
    const width = Math.min(+dimensions.width || +dimensions.length);
    const height = +dimensions.height;
    const length = Math.max(+dimensions.width || +dimensions.length);
    const weight = +dimensions.weight;
    
    // let typeOfVehicle = ''

    // //Расписываем условия при которых обязятельно нужна площадка
    //     if (weight / length > 4 && weight > 24500 && height > 3599 && length > 15600 && width > 4500) {
    //         typeOfVehicle = 'Площадка'
    //     }


    const unknownData = 'Ого, мы не проработали такую комбинацию данных. Напиши пожалуйста на почту Biryukov.Denis@aps-solver.com и приложи скрин с данными' as const
    type VehicleType = 'Габарит' | 'Площадка' | 'Мега разборная' | 'Юмба' | typeof unknownData

        const getTypeOfVehicle = (): string => {
            if (weight / length <= 4 && weight < 22001 && height <= 2940 && length < 13601 && width < 2481) {
                return 'Габарит'
            }
            if (weight / length > 4 || weight > 24500 || (height > 3599 && height < 4201) || length > 15600 || width > 4500) {
                return 'Площадка'
            }
            if (weight < 28001 && height < 4651 && length < 7901 && width < 4001) {
                return 'Тифбет'
            }
            if (weight / length <= 4 && weight < 22001 && height <= 3430 && length < 15601 && width < 4501) {
                return 'Мега разборная'
            }
            if (weight / length <= 4 && weight < 22001 && height <= 3599 && height > 2940 && length < 11601 && width < 4501) {
                return 'Юмба'
            }
            return unknownData
        }

        const typeOfVehicle = getTypeOfVehicle()

        const getTypeOfCargo = () => {
            if (width > 2550 && weight > 24500 && length > 13600 && height > 3650) {
                return 'груз габаритный'
            }
            return 'груз негабаритный'
        }
        const NegabOrNo = getTypeOfCargo()

        const getTypeOfConditionsNegabOrNo = (): string => {
            if (width > 3500 && width < 4500) {
                return 'В случае перевозки через КЗ, требуется один пилот. Через РФ - нужно два пилота'
            } else if (width >= 4500) {
                return 'В случае перевозки через КЗ, требуется один пилот. Через РФ - нужно три пилота'
            }
            return 'Пилотирование по ширине не требуется'
        }

        return `Тип техники: ${typeOfVehicle}. Тип перевозки (в габарите либо негабарит): ${NegabOrNo}.`


        return unknownData

    // return 'Ого, мы не проработали такую комбинацию данных. Напиши пожалуйста на почту Biryukov.Denis@aps-solver.com и приложи скрин с данными';
    // const loadMP = weight / length;
    // if (loadMP < 4) {
    //     if (height < 2941) {
    //         if (length < 13601) {
    //             if (width < 2301) {
    //                 if (weight < 22001) {
    //                     return answers.cargoVGabe;
    //                 } else if (weight < 25001) {
    //                     return `${answers.cargoVGabe}. ${answers.megaVGabe}. Только если перевозка будет по РФ либо Китай - РФ. ${answers.rfTenPercent}`;
    //                 } else if (weight > 25000 && weight < 27001) {
    //                     if (length < 10301) {
    //                         return answers.ploschadka + '. Груз будет в габарите по КЗ и по РФ';
    //                     } else if (length < 14301) {
    //                         return answers.ploschadka + '. По КЗ будет ещё в габарите. По РФ потребуется спец разрешение';
    //                     }
    //                 } else if (weight > 27000 && weight < 40001) {
    //                     if (length < 14301) {
    //                         return answers.ploschadka + '. По КЗ будет ещё в габарите. По РФ поедем под сопровождением';
    //                     }
    //                 } else if (weight < 75001) {
    //                     return answers.ploschadka + '. По КЗ будет спец разрешение. По РФ поедем под сопровождением';
    //                 }
    //             } else if (width < 2481) {
    //                 if (length > 13450) {
    //                     if (weight < 22001) {
    //                         return `${answers.cargoVGabe}. ${answers.megaVGabe} ввиду свеса до метра. По КЗ и по РФ надбавка и табличка для обозначения свеса не требуются.`;
    //                     } else if (weight < 25001) {
    //                         return `${answers.cargoVGabe}. ${answers.megaVGabe}. Будет свес до метра. Только если перевозка будет по РФ либо Китай - РФ. ${answers.rfTenPercent}`;
    //                     } else if (weight > 25000 && weight < 27001) {
    //                         return answers.ploschadka + '. Груз будет в габарите по КЗ и по РФ';
    //                     } else if (weight > 27000 && weight < 40001) {
    //                         return answers.ploschadka + '. По КЗ будет ещё в габарите. По РФ поедем под сопровождением';
    //                     } else if (weight < 75001) {
    //                         return answers.ploschadka + '. По КЗ будет спец разрешение. По РФ поедем под сопровождением';
    //                     }
    //                 } else if (length < 13451) {
    //                     if (width < 2481) {
    //                         if (weight < 22001) {
    //                             return answers.cargoVGabe;
    //                         }
    //                     }
    //                 }
    //             } else if (width < 2551) {
    //                 if (length < 13451) {
    //                     if (weight < 22001) {
    //                         return `${answers.cargoVGabe}. ${answers.megaVGabe} ввиду того, что надо будет разбирать полуприцеп`;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    

    // if (!(width && height && length && weight)) {
    //     return "введите все запрашиваемые параметры";
    // }

    // if (width < 2481) {
    //     if (weight / length <= 4) {
    //         if (weight < 22001) {
    //             if (height < 2941) {
    //                 if (length < 13601) {
    //                     return "груз габаритный";
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
    //         } else if (height < 3431) {
    //             if (length < 13601) {
    //                 if (location.toLoc === "КЗ") {

    //                 } else if (location.toLoc === "РФ") {

    //                 }
    //             } else if (length > 13600 && length < 14600) {
    //                 return "груз габаритный, требуется Мега разборная для свеса. Свес до метра. Спец разрешения и обозначение не требуется";
    //             } else if (length >= 14600 && length < 15600) {
    //                 if (
    //                     (location.fromLoc === "Алаш" ||
    //                         location.fromLoc === "Внутренний") &&
    //                     location.toLoc === "КЗ"
    //                 ) {
    //                     return "надбавка на Мегу разборную - 1500е. Свес от метра до двух. Требуется обозначить свес табличкой";
    //                 } else if (
    //                     location.fromLoc === "Алаш" &&
    //                     location.toLoc === "РФ"
    //                 ) {
    //                     return "надбавка на Мегу разборную - 1500e. Свес от метра до двух. Требуется обозначить свес табличкой. По РФ груз считается в габарите со свесом до двух метров";
    //                 } else if (
    //                     (location.fromLoc === "Внутренний" ||
    //                         location.fromLoc === "ЗБК") &&
    //                     location.toLoc === "РФ"
    //                 ) {
    //                     return "На Мегу разборную. Свес до двух метров. Требуется обозначить свес табличкой. По РФ груз считается в габарите со свесом до двух метров";
    //                 }
    //             } else if (length >= 15600 && length < 16900) {
    //                 if (location.toLoc === "КЗ") {
    //                     if (location.fromLoc === "Алаш") {
    //                         return "Площадка, 13000е";
    //                     } else if (location.fromLoc === "Внутренний") {
    //                         return "Площадка, 17500e";
    //                     }
    //                 } else if (location.toLoc === "РФ") {
    //                     if (location.fromLoc === "Алаш") {
    //                         return "Площадка, 15500е";
    //                     } else if (location.fromLoc === "ЗБК") {
    //                         return "Площадка, 16500e";
    //                     } else if (location.fromLoc === "Внутренний") {
    //                         return "Площадка, 19500e";
    //                     }
    //                 }
    //             } else if (length >= 16900 && length < 21001) {
    //                 if (location.toLoc === "КЗ") {
    //                     if (location.fromLoc === "Алаш") {
    //                         return "Площадка, 18250";
    //                     } else if (location.fromLoc === "Внутренний") {
    //                         return "Площадка, 24250";
    //                     }
    //                 } else if (location.toLoc === "РФ") {
    //                     if (location.fromLoc === "Алаш") {
    //                         return "Площадка, 21050e";
    //                     } else if (location.fromLoc === "ЗБК") {
    //                         return "Площадка, 22100e";
    //                     } else if (location.fromLoc === "Внутренний") {
    //                         return "Площадка, 26100e";
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // } else if (width > 2480 && width < 2551) {
    // }
    }
