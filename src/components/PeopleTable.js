import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectPeople } from '../redux/reducers/people/selectors';
import PeopleTablePagination from './PeopleTablePagination';
import { LOAD_USERS } from '../redux/reducers/people/actions';
import Search from './Search';
import Loader from './Loader';

export default function PeopleTable() {
    const people = useSelector(selectPeople);
    const dispatch = useDispatch();

    const onChangePage = (newPage) => dispatch({
        type: LOAD_USERS,
        payload: {
            page: newPage,
            search: people.search
        },
    });

    const peopleTable = (
        <>
            <table border={1} width="100%" cellPadding={2} cellSpacing={0}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Birth Year</th>
                    <th>Eye Color</th>
                    <th>Gender</th>
                    <th>Hair Color</th>
                    <th>Height</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                { people?.data?.results.map((character, i) => {
                    const id = character.url.replaceAll(/\D/g, '');

                    return (
                        <tr key={i}>
                            <td>{character.name}</td>
                            <td>{character.birth_year}</td>
                            <td>{character.eye_color}</td>
                            <td>{character.gender}</td>
                            <td>{character.hair_color}</td>
                            <td>{character.height}</td>
                            <td>
                                <Link to={`/people/${id}`}>
                                    Details
                                </Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <PeopleTablePagination
                page={people.page}
                total={people?.data?.count}
                onChange={onChangePage}
            />
        </>
    )

    return (
        <>
            <h2>Star Wars People</h2>
            <Search />
            { people.loading ? <Loader /> : peopleTable }
        </>
    );
}
