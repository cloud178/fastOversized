import "./App.css";
import { ChangeEvent, useState, useEffect } from "react";
import { calculateResult } from "./common/Calculator/Calculator.ts";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import { Result } from "./components/Result/Result.tsx";
import { ControlledButtons } from "./components/Button/ControlledButtons/ControlledButtons.tsx";

export type DimensionsType = {
    width: string;
    height: string;
    length: string;
    weight: string;
};

export type TypeOfMeasure = "mm" | "cm" | "m";

export type LocationType = {
    fromLoc: "Внутренний" | "Алаш" | "ЗБК";
    toLoc: "КЗ" | "РФ";
};

function App() {
    useEffect( () => {
        const length = localStorage.getItem('length')
        const width = localStorage.getItem('width')
        const height = localStorage.getItem('height')
        const weight = localStorage.getItem('weight')
        if (length && width && height && weight) {
            setDimensions({
                length: JSON.parse(length),
                width: JSON.parse(width),
                height: JSON.parse(height),
                weight: JSON.parse(weight),
            })
        }
    }, [] )

    

    const [dimensions, setDimensions] = useState<DimensionsType>({
        width: "",
        height: "",
        length: "",
        weight: "",
    });

    const [errors, setErrors] = useState<DimensionsType>({
        width: "",
        height: "",
        length: "",
        weight: "",
    });

    const [result, setResult] = useState<string[]>([]);
    const [btnCalculateDisabled, setBtnCalculateDisabled] = useState(false);

    const limits = {
        width: { min: 50, max: 6000 },
        height: { min: 50, max: 4650 },
        length: { min: 50, max: 24999 },
        weight: { min: 50, max: 75000 },
    };

    const btnDisabledCondition: boolean =
        btnCalculateDisabled ||
        +dimensions.weight > limits.weight.max ||
        +dimensions.height > limits.height.max ||
        +dimensions.length > limits.length.max ||
        +dimensions.width > limits.width.max ||
        +dimensions.weight < limits.weight.min ||
        +dimensions.height < limits.height.min ||
        +dimensions.length < limits.length.min ||
        +dimensions.width < limits.width.min;

        useEffect(() => {
            const handleKeyDown = (e: any) => {
                if (e.key === 'Enter' && !btnDisabledCondition) {
                    calculateHandler();
                }
            };
        
            window.addEventListener("keydown", handleKeyDown);
          
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        });

    const setDimensionHandler =
        (key: keyof typeof dimensions) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.currentTarget.value;

            setDimensions((prev) => ({ ...prev, [key]: newValue }));
            // setDimensions({...dimensions, [key]: ''});
            if (newValue === "") {
                setErrors((prev) => ({ ...prev, [key]: "" }));
                return;
            }

            const numericValue = +newValue;
            if (
                numericValue >= limits[key].min &&
                numericValue <= limits[key].max
            ) {
                setErrors((prev) => ({ ...prev, [key]: "" }));
                setBtnCalculateDisabled(false);
            } else {
                setErrors((prev) => ({
                    ...prev,
                    [key]: `${
                        key.charAt(0).toUpperCase() + key.slice(1)
                    } ${numericValue}${
                        key === "weight" ? "кг" : "мм"
                    } не сможем предложить`,
                }));
            }
        };

    const resetValuesHandler = () => {
        setDimensions({
            width: "",
            height: "",
            length: "",
            weight: "",
        });
        setErrors({
            width: "",
            height: "",
            length: "",
            weight: "",
        });
        setResult([]);
        localStorage.setItem('length', JSON.stringify(''))
            localStorage.setItem('width', JSON.stringify(''))
            localStorage.setItem('height', JSON.stringify(''))
            localStorage.setItem('weight', JSON.stringify(''))
    };

    const calculateHandler = () => {
        if (
            !(
                dimensions.width &&
                dimensions.height &&
                dimensions.length &&
                dimensions.weight
            )
        ) {
            setResult(["введите все запрашиваемые параметры"]);
        } else {
            setResult(calculateResult(dimensions));
            setBtnCalculateDisabled(true);
            localStorage.setItem('length', JSON.stringify(String(Math.max(+dimensions.length, +dimensions.width))))
            localStorage.setItem('width', JSON.stringify(String(Math.min(+dimensions.length, +dimensions.width))))
            localStorage.setItem('height', JSON.stringify(String(+dimensions.height)))
            localStorage.setItem('weight', JSON.stringify(String(+dimensions.weight)))
        }
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
            }}
            // onKeyDown={
            //     e => e.key === 'Enter' 
            //     && !btnDisabledCondition 
            //     && calculateHandler()
            // }

        >
            <h3>Fast Oversized Helper</h3>
            <Grid2
                sx={{ display: "flex", flexDirection: "column", gap: "40px" }}
            >
                {(["length", "width", "height", "weight"] as const).map(
                    (key) => (
                        <Box key={key}>
                            <label>
                                {/* {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                                {key === "weight" ? "кг " : "мм "} */}
                                <TextField
                                    type="number"
                                    error={!!errors[key]}
                                    // helperText={key}
                                    label={
                                        key === "weight"
                                            ? `${key}, kg`
                                            : `${key}, mm`
                                    }
                                    sx={{
                                        width: "300px",
                                        position: "relative",
                                    }}
                                    value={dimensions[key]}
                                    onChange={setDimensionHandler(key)}
                                />
                            </label>
                            {errors[key] && (
                                <p className={"error"}>{errors[key]}</p>
                            )}
                        </Box>
                    )
                )}
            </Grid2>
            <Grid2 sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <ControlledButtons dimensions={dimensions} resetValuesHandler={resetValuesHandler} btnDisabledCondition={btnDisabledCondition} calculateHandler={calculateHandler}/>
            </Grid2>
            {result.length >= 1 && (
                <Result
                    result={result}
                    vehicleType={result[0]}
                    length={result.length}
                />
            )}
        </Container>
    );
}

export default App;
