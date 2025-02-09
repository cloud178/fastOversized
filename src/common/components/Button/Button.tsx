type Props = {
    title: string
    callback?: () => void
    isDisabled?: boolean
};
export const Button = ({title, callback, isDisabled}: Props) => {
    const onClickHandler = () => {
        if (callback) {
            callback()
        }
    }

    return (
        <button
            onClick={onClickHandler}
            disabled={isDisabled}
        >{title}</button>
    );
};
