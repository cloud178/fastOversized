import s from "./ResultTable.module.css";

type ResultTableType = {
    result: string[];
};

export const ResultTable = ({ result }: ResultTableType) => {
    return (
        <div
            className={`${s.result__wrapper} ${
                result[0] === "не сможем предложить" ? s.redBorder : ""
            }`}
        >
            <div className={s.result__header}>Результат</div>
            <div className={s.result__sidebar__typeOfVehicle}>Тип техники</div>
            <div className={s.result__sidebar__Count}>Кол-во техники в парке</div>
            <div className={s.result__sidebar__NegabOrNo}>
                Тип перевозки (в габарите либо негабарит)
            </div>
            <div className={s.result__sidebar__justificationOfTypeOfVehicle}>
                Обоснование типа техники:
            </div>
            <div className={s.result__sidebar__reasonwhyNegab}>
                Обоснование почему негабарит:
            </div>
            <div className={s.result__sidebar__pilot}>Пилотирование</div>
            <div className={s.result__content__typeOfVehicle}>{result[0]}</div>
            <div className={s.result__content__Count}>
                {["Тент", "Мега", "Мега разборная"].includes(result[0])
                    ? "50+"
                    : result[0] === "Длинномер"
                    ? "30"
                    : result[0] === "Юмба"
                    ? "5"
                    : result[0] === "Площадка"
                    ? "12, Не считая тифбета"
                    : "1"}
            </div>
            <div className={s.result__content__NegabOrNo}>{result[1]}</div>
            <div className={s.result__content__justificationOfTypeOfVehicle}>
                {result[2]}
            </div>
            <div className={s.result__content__reasonwhyNegab}>{result[3]}</div>
            <div className={s.result__content__pilot}>{result[4]}</div>
        </div>
    );
};
