import {useDispatch, useSelector} from 'react-redux';
import { selectPeople } from '../redux/reducers/people/selectors';
import {LOAD_USERS} from '../redux/reducers/people/actions';

export default function Search() {
    const people = useSelector(selectPeople);
    const dispatch = useDispatch();

    const search = e => dispatch({
        type: LOAD_USERS,
        payload: {
            page: 1,
            search: e?.target?.value,
        }
    });

    return (
        <>
            <form style={{ display: 'inline-block '}}>
                <input
                    style={{ padding: '12px 20px', margin: '10px' }}
                    type="text"
                    value={people?.search}
                    onChange={search}
                    placeholder='Search people...'
                />
            </form>
        </>
    )
}
