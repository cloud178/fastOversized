import { Notification } from "../../common/Notification/Notification"
import { ResultImg } from "./ResultImg/ResultImg"
import { ResultTable } from "./ResultTable/ResultTable"
import s from './Result.module.css'

type ResultType = {
    result: string[]
    vehicleType: string
    length: number
}

export const Result = ({result, vehicleType, length}: ResultType) => {
    return (
        <div className={s.fadeIn}>
            <ResultTable result={result} />
            <ResultImg vehicleType={vehicleType} pilots={result[4]}/>
            <Notification length={length}/>
        </div>
    )
}
