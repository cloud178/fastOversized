import { DimensionsType } from "../../App";

export const answers = {
    cargoVGabe: "Груз с вышеуказанными параметрами считается в габарите",
    megaVGabe: "Нужна Мега разборная",
    Jumbo: "Нужна Юмба",
    megaOrJumbo: "Нужна Мега или Юмба",
    ploschadka: "Нужна Площадка",
    tiefbett: "Нужен Тифбет",
    bolshajaNagruzkaNaMetrPogonny: "Большая нагрузка на метр погонный",
    rfTenPercent:
        "По РФ не считается нарушением превышение допустимых нагрузок и общего веса до 10%",
} as const;

const unknownData =
"Ого, мы не проработали такую комбинацию данных. Напиши пожалуйста на почту Biryukov.Denis@aps-solver.com и приложи скрин с данными" as const;

export type VehicleType = 'Тент' | 'Мега' | 'Длинномер' | 'Мега разборная' | 'Юмба' | 'Площадка' | 'Тифбет' | 'не сможем предложить' | typeof unknownData


export const calculateResult = (dimensions: DimensionsType): string[] => {
    const length = +Math.max(+dimensions.width, +dimensions.length);
    const width = +Math.min(+dimensions.width, +dimensions.length);
    const height = +dimensions.height;
    const weight = +dimensions.weight;
    
    const getTypeOfVehicle = (): VehicleType => {
        if (
            weight / length <= 4 &&
            weight < 24501 &&
            height <= 2700 &&
            length < 13601 &&
            width < 2481
        ) {
            return "Тент";
        }
        if (
            weight / length <= 4 &&
            weight < 24501 &&
            height <= 2940 &&
            length < 13601 &&
            width < 2481
        ) {
            return "Мега";
        }
        if (
            weight / length <= 4 &&
            weight < 22001 &&
            height <= 2681 &&
            length < 16351 &&
            width < 2481
        ) {
            return "Длинномер";
        }
        if (
            weight / length <= 4 &&
            weight < 24501 &&
            length < 15601 &&
            width < 4501 &&
            height <= 3430 && height > 3100
        ) {
            return "Мега разборная";
        }
        if (
            weight / length <= 4 &&
            weight < 22001 &&
            height <= 3599 &&
            height > 2940 &&
            length < 11601 &&
            width < 4501
        ) {
            return "Юмба";
        }
        if (
            weight / length <= 4 &&
            weight < 24501 &&
            height <= 3430 &&
            length < 15601 &&
            width < 4501
        ) {
            return "Мега разборная";
        }
        if (weight < 28001 && (height > 3700 && height < 4651) && length < 7901 && width < 4001) {
            return "Тифбет";
        }
        if (
            weight / length > 4 ||
            weight > 24500 ||
            (height > 3599 && height < 3650) ||
            length > 15600 ||
            width > 4500 ||
            (height < 3701 && length > 7900 && width > 2550 && weight > 28000)
        ) {
            return "Площадка";
        }
        if (weight < 28001 && height < 4651 && length < 7901 && width < 4001) {
            return "Тифбет";
        }
        if (weight > 28001 || (height > 3700 && height < 4201)) {
            return "Площадка";
        }
        if (
            (weight / length > 4 ||
                weight > 24500 ||
                (height > 3599 && height < 4201) ||
                length > 15600 ||
                width > 4500) &&
            height >= 4201
        ) {
            return "не сможем предложить";
        }
        return unknownData;
    };
    const typeOfVehicle = getTypeOfVehicle();

    const getTypeOfCargo = () => {
        switch (typeOfVehicle) {
            case "Тент":
                return "груз габаритный";
            case "Мега":
                return "груз габаритный";
            case "Длинномер":
                return "груз габаритный";
            case "Мега разборная":
                if (width > 2550 || height > 2940 || length > 14600) {
                    return "груз негабаритный";
                }
                return "груз габаритный";
            case "Юмба":
                if (width > 2550 || height > 3100 || length > 10600) {
                    return "груз негабаритный";
                }
                return "груз габаритный";
            case "Площадка":
                if (
                    width > 2550 ||
                    height > 3200 ||
                    length > 10600 ||
                    weight > 24000
                ) {
                    return "груз негабаритный";
                }
                return "груз габаритный";
            case "Тифбет":
                if (width > 2550 || height > 3650 || length > 7900) {
                    return "груз негабаритный";
                }
                return "груз габаритный";
            case "не сможем предложить":
                return "не сможем предложить";
            default:
                return "груз габаритный";
        }
    };
    const NegabOrNo = getTypeOfCargo()
    // const NegabOrNo: string = getTypeOfCargo(typeOfVehicle, length, width, height, weight);

    const getJustificationOfTypeOfVehicle = () => {
        switch (typeOfVehicle) {
            case "Тент":
                return "Груз в габарите, указанные параметры позволяют загрузить груз в Тент";
            case "Мега":
                return "Груз в габарите, указанные параметры позволяют загрузить груз в Мегу";
            case "Длинномер":
                return "Груз в габарите, указанные параметры позволяют загрузить груз в Длинномер";
            case "Мега разборная":
                if (width > 2481 && height > 2940 && length > 13600) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено тут в совокупности: длина более 13600мм, ширина более 2480мм, высота более 2940мм.";
                }
                if (height > 2940 && length > 13600) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено тут в совокупности: длина более 13600мм, высота более 2940мм.";
                }
                if (width > 2481 && length > 13600) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено тут в совокупности: длина более 13600мм, ширина более 2480мм.";
                }
                if (width > 2481 && height > 2940) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено тут в совокупности: ширина более 2480мм, высота более 2940мм.";
                }
                if (width > 2481) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено: ширина более 2480мм.";
                }
                if (height > 2940) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено: высота более 2940мм.";
                }
                return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено: длина более 13600мм.";
            case "Юмба":
                if (
                    height > 2940 &&
                    height < 3101 &&
                    width < 2481 &&
                    length < 9601
                ) {
                    return "Груз в габарите, указанные параметры позволяют загрузить груз в Юмбу. Отличительная черта Юмб в сравнении с Мегами в погрузочной высоте, а именно 900мм против 1060мм, что позволяет грузить более высокие грузы.";
                }
                if (
                    height > 3439 &&
                    height < 3600 &&
                    width < 2481 &&
                    length < 9601
                ) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено тут: высота более 3100мм. . Отличительная черта Юмб в сравнении с Мегами в погрузочной высоте, а именно 900мм против 1060мм, что позволяет грузить более высокие грузы";
                }
                if (
                    width > 2481 &&
                    height < 3601 &&
                    height > 3430 &&
                    length > 9600
                ) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено тут в совокупности: длина более 9600мм, ширина более 2480мм, высота более 3100мм. Отличительная черта Юмб в сравнении с Мегами в погрузочной высоте, а именно 900мм против 1060мм, что позволяет грузить более высокие грузы.";
                }
                if (
                    width > 2481 &&
                    height < 3601 &&
                    height > 3430 &&
                    length <= 9600
                ) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено тут в совокупности: ширина более 2480мм, высота более 3100мм. Отличительная черта Юмб в сравнении с Мегами в погрузочной высоте, а именно 900мм против 1060мм, что позволяет грузить более высокие грузы.";
                }
                if (
                    width <= 2481 &&
                    height < 3601 &&
                    height > 3430 &&
                    length > 9600
                ) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено тут в совокупности: длина более 9600мм, высота более 3100мм. Отличительная черта Юмб в сравнении с Мегами в погрузочной высоте, а именно 900мм против 1060мм, что позволяет грузить более высокие грузы.";
                }
                if (
                    width <= 2481 &&
                    height < 3601 &&
                    height > 3430 &&
                    length <= 9600
                ) {
                    return "Требуется разборное авто, т.к. указаннные габариты превышают внутренние габариты наших тентов, а имеено тут: высота более 3100мм. Отличительная черта Юмб в сравнении с Мегами в погрузочной высоте, а именно 900мм против 1060мм, что позволяет грузить более высокие грузы.";
                }
                return unknownData;
            case "Площадка": {
                const bolchajaNahruzkaNaMP = weight / length > 4;
                const bigWeight = weight > 24500;
                const bigHeight = height > 3599;
                const bigLength = length > 15600;
                const bigWidth = width > 4500;

                return (
                    `Площадку рассматриваем ввиду: ` +
                    [
                        bolchajaNahruzkaNaMP
                            ? "большой нагрузки на метр погонный c целью предотварить повреждение обычных полуприцепов"
                            : "",
                        bigHeight ? "высоты" : "",
                        bigWeight ? "веса" : "",
                        bigLength ? "длины" : "",
                        bigWidth ? "ширины" : "",
                    ]
                        .filter(Boolean)
                        .join(", ")
                );
            }
            case "Тифбет":
                return "рассматриваем тифбет вместо площадки ввиду большой высоты. Отличительная черта Тифбета в сравнении с Площадками в погрузочной высоте, а именно 350мм против 800-900мм, что позволяет грузить более высокие грузы.";
            case "не сможем предложить":
                return "не сможем предложить";
            default:
                return unknownData;
        }
    };
    const justificationOfTypeOfVehicle = getJustificationOfTypeOfVehicle();

    const getReasonWhyNegab = () => {
        let result = "";
        if (width > 2550) {
            result += "Ширина более 2550мм.";
        }
        switch (typeOfVehicle) {
            case "Мега разборная":
                if (height > 2940) {
                    result += " Общая высота более 4000мм.";
                }
                if (length > 14600) {
                    result += " Свес более 1000мм.";
                }
                break;
            case "Юмба": {
                if (height > 3100) {
                    result += " Общая высота более 4000мм.";
                }
                if (length > 10600) {
                    result += " Свес более 1000мм.";
                }
                break;
            }
            case "Площадка": {
                if (height > 3200) {
                    result += " Общая высота более 4000мм.";
                }
                if (length > 10600) {
                    result += " Свес более 1000мм.";
                }
                if (length > 12950) {
                    result += " Общая длина более 20000мм";
                }
                if (weight > 28400) {
                    result += " Общий вес более 48400кг.";
                }
                break;
            }
            case "Тифбет": {
                console.log(typeOfVehicle);

                if (height > 3650) {
                    result += " Общая высота более 4000мм.";
                }
                if (weight > 16000) {
                    result += " Общий вес более 44000кг.";
                }
                break;
            }
            default:
        }
        return result || "Груз в габарите";
    };

    const reasonwhyNegab = getReasonWhyNegab();

    const Pilots = () => {
        let resultKZ = ''
        let resultRF = ''
        let resultRB = ''
        let empty = ''

        switch (typeOfVehicle) {
            case 'Длинномер': {
                empty = 'Пилотирование не требуется'
                break;

            }
            case 'Тент': {
                empty = 'Пилотирование не требуется'
                break;

            }
            case 'Мега': {
                empty = 'Пилотирование не требуется'
                break;

            }
            case 'Мега разборная': {
                if (width < 3500 && height < 3441) {
                    empty = 'Пилотирование не требуется'
                }
                if (width > 3500 || height > 3440) {
                    resultKZ = 'КЗ: требуется 1 пилот.' 
                }
                if (height > 3440) {
                    resultRF = 'РФ: требуется 1 пилот.'
                }
                if (width > 3500 && width < 4500) {
                    resultRF = 'РФ: требуется 2 пилота.'
                }
                if (width >= 4500) {
                    resultRF = 'РФ: требуется 3 пилота.'
                }
                if ((width > 3500 && width <= 4000) || height > 3940) {
                    resultRB = 'РБ: требуется авто прикрытия'
                }
                if (width > 4000) {
                    resultRB = 'РБ: требуется авто прикрытия и авто ГАИ'
                }
                break;

            }
            case 'Ого, мы не проработали такую комбинацию данных. Напиши пожалуйста на почту Biryukov.Denis@aps-solver.com и приложи скрин с данными': {
                empty = '0_о'
                break;

            }
            case 'не сможем предложить': {
                empty = '---'
                break;

            }
            case 'Юмба': {
                if (width < 3500 && height < 3601) {
                    empty = 'Пилотирование не требуется'
                }
                if (width > 3500 || height > 3600) {
                    resultKZ = 'КЗ: требуется 1 пилот.' 
                }
                if (height > 3600) {
                    resultRF = 'РФ: требуется 1 пилот.'
                }
                if (width > 3500 && width < 4500) {
                    resultRF = 'РФ: требуется 2 пилота.'
                }
                if (width >= 4500) {
                    resultRF = 'РФ: требуется 3 пилота.'
                }
                if ((width > 3500 && width <= 4000) || height > 4100) {
                    resultRB = 'РБ: требуется авто прикрытия'
                }
                if (width > 4000) {
                    resultRB = 'РБ: требуется авто прикрытия и авто ГАИ'
                }
                break;

            }
            case 'Площадка': {
                let lightOrHeavyPloschadka = weight < 42000
                if (width < 3500 && ( lightOrHeavyPloschadka ? height < 3701 : height < 3601) && length < 16401) {
                    empty = 'Пилотирование не требуется'
                }
                if (width > 3500 || ( lightOrHeavyPloschadka ? height > 3700 : height > 3600) || length > 16400) {
                    resultKZ = 'КЗ: требуется 1 пилот.' 
                }
                if (lightOrHeavyPloschadka ? height > 3701 : height > 3601) {
                    resultRF = 'РФ: требуется 1 пилот.'
                }
                if ((width > 3500 && width < 4500) || length > 17950) {
                    resultRF = 'РФ: требуется 2 пилота.'
                }
                if (width >= 4500) {
                    resultRF = 'РФ: требуется 3 пилота.'
                }
                if ((length <= 22950 && length > 17950) || (width > 3500 && width < 4000) || (lightOrHeavyPloschadka ? height > 4200 : height > 4100) || (weight > 40000 && weight < 56000) ) {
                    resultRB = 'РБ: требуется авто прикрытия'
                }
                if (length > 22950 || width >= 4000 || (lightOrHeavyPloschadka ? height > 4200 : height > 4100) || weight >= 56000 ) {
                    resultRB = 'РБ: требуется авто прикрытия и авто ГАИ'
                }
                break;

            }
            case 'Тифбет': {
                if (width < 3500 && height < 4151 && length < 7901) {
                    empty = 'Пилотирование не требуется'
                }
                if (width > 3500 || height > 4150) {
                    resultKZ = ' КЗ: требуется 1 пилот.' 
                }
                if (height > 4150) {
                    resultRF = ' РФ: требуется 1 пилот.'
                }
                if (width > 3500 && width < 4500) {
                    resultRF = ' РФ: требуется 2 пилота.'
                }
                if (width >= 4500) {
                    resultRF = ' РФ: требуется 3 пилота.'
                }
                if ((width > 3500 && width < 4000) || height > 4650) {
                    resultRB = ' РБ: требуется авто прикрытия'
                }
                if (width >= 4000) {
                    resultRB = ' РБ: требуется авто прикрытия и авто ГАИ'
                }
                break;

            }
        }
        return empty || `${resultKZ} ${resultRF} ${resultRB}`
    }

    return [
        typeOfVehicle,
        NegabOrNo,
        justificationOfTypeOfVehicle,
        reasonwhyNegab,
        Pilots()
    ];
};


