import {useContext} from 'react'
import {UserContext} from '../context/UserContext'
import {Redirect} from 'react-router-dom'

const EditUser = ({...props}) => {
    const userValue = useContext(UserContext)

    if(!userValue.user.username){
        return <Redirect to='/'/>
    }

    return (
        <div className="edit-user">
            <input placeholder='username'/>
            <input placeholder='password'/>
            <input placeholder='first name'/>
            <input placeholder='last name'/>
            {/* <input placeholder='timezone'/> */}
            <button>Submit</button>
        </div>
    )
}

export default EditUser
