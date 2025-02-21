import "./App.css";
import { ChangeEvent, useState } from "react";
import { calculateResult } from "./common/Calculator/Calculator.ts";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import { Result } from "./components/Result/Result.tsx";

export type DimensionsType = {
    width: string;
    height: string;
    length: string;
    weight: string;
};

export type TypeOfMeasure = 'mm' | 'cm' | 'm'

export type LocationType = {
    fromLoc: "Внутренний" | "Алаш" | "ЗБК";
    toLoc: "КЗ" | "РФ";
};

function App() {
    const [dimensions, setDimensions] = useState<DimensionsType>({
        width: "",
        height: "",
        length: "",
        weight: "",
    });

    // const [location, setLocation] = useState<LocationType>({
    //     fromLoc: "Внутренний",
    //     toLoc: "РФ",
    // });

    const [errors, setErrors] = useState<DimensionsType>({
        width: "",
        height: "",
        length: "",
        weight: "",
    });

    const [result, setResult] = useState<string[]>([]);
    const [btnCalculateDisabled, setBtnCalculateDisabled] = useState(false)

    const limits = {
        width: { min: 50, max: 6000 },
        height: { min: 50, max: 4650 },
        length: { min: 50, max: 24999 },
        weight: { min: 50, max: 75000 },
    };

    const setDimensionHandler =
        (key: keyof typeof dimensions) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.currentTarget.value;

            setDimensions((prev) => ({ ...prev, [key]: newValue }));
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
                setBtnCalculateDisabled(false)
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
        // setLocation({
        //     fromLoc: "Внутренний",
        //     toLoc: "РФ",
        // });
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
            setBtnCalculateDisabled(true)
        }
    };

    // const hasError = Object.values(errors).some((error) => !!error);

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
            }}
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
                                    sx={{ width: "300px", position: 'relative' }}
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
            <Grid2 sx={{ display: "flex", gap: "20px", marginTop: '20px' }}>
                <Button
                    sx={{ maxWidth: "120px" }}
                    variant="contained"
                    onClick={resetValuesHandler}
                    disabled={!(dimensions.length || dimensions.width || dimensions.height || dimensions.weight)}
                >
                    сбросить значения
                </Button>
                <Button
                    disabled={
                        btnCalculateDisabled ||
                        +dimensions.weight > limits.weight.max ||
                        +dimensions.height > limits.height.max ||
                        +dimensions.length > limits.length.max ||
                        +dimensions.width > limits.width.max ||
                        +dimensions.weight < limits.weight.min ||
                        +dimensions.height < limits.height.min ||
                        +dimensions.length < limits.length.min ||
                        +dimensions.width < limits.width.min
                    }
                    sx={{ maxWidth: "120px" }}
                    variant="contained"
                    onClick={calculateHandler}
                >
                    рассчитать
                </Button>
            </Grid2>
            {result.length >= 1 && <Result 
                result={result} 
                vehicleType={result[0]} 
                length={result.length}
            />}
        </Container>
    );
}

export default App;
