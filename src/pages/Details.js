export default function Details(props) {
    const { match: { params } } = props;

    return (
        <div>
            Details page
            {JSON.stringify(params, null, 2)}
        </div>
    );
}
