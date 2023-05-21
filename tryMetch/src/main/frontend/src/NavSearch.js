import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


function NavSearch() {
    return (
        <>
        <div className='text-form-margin'>
            <Form.Control type="text" placeholder="어디로, 어떤 여행을 떠날 예정인가요?" />
            
        </div>
        <div className='search-btn'><FontAwesomeIcon icon={faSearch} style={{color: "#83a6e2",}}/></div>
        </>
    )
}

export default NavSearch;