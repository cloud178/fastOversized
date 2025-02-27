import Button from "@mui/material/Button";
import { DimensionsType } from "../../../App";

type ControlledButtonsPropsType = {
    dimensions: DimensionsType;
    resetValuesHandler: () => void;
    btnDisabledCondition: boolean;
    calculateHandler: () => void;
};

export const ControlledButtons = ({
    dimensions,
    resetValuesHandler,
    btnDisabledCondition,
    calculateHandler,
}: ControlledButtonsPropsType) => {
    return (
        <>
            <Button
                sx={{ maxWidth: "120px" }}
                variant="contained"
                onClick={resetValuesHandler}
                disabled={
                    !(
                        dimensions.length ||
                        dimensions.width ||
                        dimensions.height ||
                        dimensions.weight
                    )
                }
            >
                сбросить значения
            </Button>
            <Button
                disabled={btnDisabledCondition}
                sx={{ maxWidth: "120px" }}
                variant="contained"
                onClick={calculateHandler}
            >
                рассчитать
            </Button>
        </>
    );
};
