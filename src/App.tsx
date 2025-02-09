import './App.css'
import { Button } from "./common/components/Button/Button.tsx";
import { ChangeEvent, useState } from "react";
import { calculateResult } from "./common/Calculator/Calculator.ts";

export type DimensionsType = {
    width: string;
    height: string;
    length: string;
    weight: string;
};

export type LocationType = "Внутренний" | "Алаш" | "ЗБК" | "Другое";

function App() {
    const [dimensions, setDimensions] = useState<DimensionsType>({
        width: '',
        height: '',
        length: '',
        weight: ''
    });

    const [errors, setErrors] = useState<DimensionsType>({
        width: '',
        height: '',
        length: '',
        weight: ''
    });

    const [result, setResult] = useState("");

    const limits = {
        width: { min: 1, max: 6000 },
        height: { min: 1, max: 4650 },
        length: { min: 1, max: 4200 },
        weight: { min: 1, max: 75000 }
    };

    const setDimensionHandler =
        (key: keyof typeof dimensions) => (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.currentTarget.value;

            setDimensions(prev => ({ ...prev, [key]: newValue }));

            if (newValue === "") {
                setErrors(prev => ({ ...prev, [key]: "" }));
                return;
            }

            const numericValue = +newValue;
            if (numericValue >= limits[key].min && numericValue <= limits[key].max) {
                setErrors(prev => ({ ...prev, [key]: "" }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} ${numericValue}mm is out of range`
                }));
            }
        };

    const resetValuesHandler = () => {
        setDimensions({
            width: '',
            height: '',
            length: '',
            weight: ''
        });
        setErrors({
            width: '',
            height: '',
            length: '',
            weight: ''
        });
        setResult("");
    };

    const calculateHandler = () => {
        setResult(calculateResult(dimensions));
    };

    const hasError = Object.values(errors).some(error => !!error);

    return (
        <>
            <h3>Fast Oversized Calculator</h3>
            <div>
                {(['width', 'height', 'length', 'weight'] as const).map((key) => (
                    <div key={key}>
                        <label>
                            {`${key.charAt(0).toUpperCase() + key.slice(1)}: `}
                            <input
                                type="number"
                                value={dimensions[key]}
                                onChange={setDimensionHandler(key)}
                            />
                        </label>
                        {errors[key] && <p className={'error'}>{errors[key]}</p>}
                    </div>
                ))}

                {/* Select + Input для выбора "откуда" */}
                <div>
                    <label>
                        Откуда:
                        <select
                        >
                            <option value="Внутренний">Внутренний</option>
                            <option value="Алаш">Алаш</option>
                            <option value="ЗБК">ЗБК</option>
                        </select>
                    </label>
                </div>
            </div>

            <Button title={'reset values'} callback={resetValuesHandler} />
            <Button title={'calculate'} isDisabled={hasError} callback={calculateHandler} />

            <p>пока чисто для РФ, условно из МНЧ на РФ</p>
            {result && <p className="result">{result}</p>}
        </>
    );
}

export default App;
