import { selectPeopleDetails } from '../redux/reducers/peopleDetails/selectors';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

export default function Details() {
    const peopleDetails = useSelector(selectPeopleDetails);

    if (peopleDetails.loading) {
        return <Loader />
    }

    const { name, birth_year, skin_color, mass, height } = peopleDetails.data;

    return (
        <div>
            <h2>{name}</h2>
            <h4>{birth_year}</h4>
            <p>Skin: {skin_color}</p>
            <p>Mass: {mass}</p>
            <p>Height: {height}</p>
        </div>
    );
}
