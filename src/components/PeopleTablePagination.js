const LIMIT = 10;

export default function PeopleTablePagination(props) {
    const { page, total, onChange } = props;
    const totalPages = Math.ceil(total / LIMIT);

    const styles = {
        cursor: 'pointer'
    }

    return (
        <div>
            {
                Array
                    .from({ length: totalPages }, (_, i) => i + 1)
                    .map((pageIndex, i) => {
                        const isActive = pageIndex === page;
                        const action = () => {
                            if (pageIndex !== page) {
                                onChange(pageIndex);
                            }
                        }

                        return isActive ?
                            (
                                <b
                                    onClick={action}
                                    key={i}
                                    style={styles}
                                >
                                    {' '}{pageIndex}{' '}
                                </b>
                            ) :
                            <span
                                onClick={action}
                                key={i}
                                style={styles}
                            >
                                {' '}{pageIndex}{' '}
                            </span>
                    })
            }
        </div>
    )
}
