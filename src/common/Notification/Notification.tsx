type NotificationType = {
    length: number;
};

export const Notification = ({ length }: NotificationType) => {
    return (
        <>
            {length >= 1 && (
                <h4 style={{ marginTop: "0px" }}>
                    Приведенная выше информация{" "}
                    <span style={{ color: "red", fontStyle: "italic" }}>
                        ориентировочная
                    </span>{" "}
                    и не учитывает абсолютно все нюансы. За более детальной
                    проработкой обращайтесь к Плану Негабарит:
                    negab@aps-solver.com либо в 1С в рамках просчёта конкретного
                    запроса 😎🚀
                </h4>
            )}
        </>
    );
};
