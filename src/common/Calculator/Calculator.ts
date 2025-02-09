// common/Calculator/Calculator.ts
import { DimensionsType } from "../../App";

export const calculateResult = (dimensions: DimensionsType): string => {
    const width = +dimensions.width;
    const height = +dimensions.height;
    const length = +dimensions.length;
    const weight = +dimensions.weight;

    // Пример расчётов
    if (width < 2551 && height < 2941 && length < 1361 && weight < 22001) {
        return 'груз в габе'
    } else if (width > 2550 && width < 3500) {
        return "+2000е";
    } else if (width > 3499 && width < 4000) {
        return "5000e";
    } else {
        return 'in progress'
    }

};
