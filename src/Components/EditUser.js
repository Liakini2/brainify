import {useContext, useState, useEffect} from 'react'
import {UserContext} from '../context/UserContext'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const EditUser = ({...props}) => {
    const [editUser, setEditUser] = useState({oldPassword: '', password: '', first_name: '', last_name: ''})
    const history = useHistory()
    const userValue = useContext(UserContext)

    useEffect(() => {
        axios.get('/auth/me')
        .then(({data})=>{
            userValue.setUser(data)
            setEditUser(data)
        })
        .catch(_=>history.push('/'))
    }, [])

    const checkPassword = () => {
        //must contain at least 1 number, 1 capital letter, 1 lower case letter and one special character
        var reg = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8, 32}$/)
        return reg.test(editUser.password);
    }

    const checkName = (n) => {
        //can only contain letters a , . ' or -
        let reg = new RegExp(/^[a-z ,.'-]+$/i);
        return reg.test(n);
    }
    
    const updateUser=()=>{
        if(checkPassword() && checkName(editUser.first_name) && checkName(editUser.last_name)){
            axios.put(`/auth/user`, {})
            .then()
            .catch()
        }
    }

    return (
        <div className="edit-user">
            <section>
                <span>First Name: </span>
                <input value={editUser.firstName} onChange={e=>setEditUser({...editUser, first_name: e.target.value})}/>
            </section>
            <section>
                <span>Last Name: </span>
                <input value={editUser.lastName} onChange={e=>setEditUser({...editUser, last_name: e.target.value})}/>
            </section>
            <section>
                <span>Old Password: </span>
                <input value={editUser.password} onChange={e=>setEditUser({...editUser, password: e.target.value})}/>
            </section>
            <section>
                <span>New Password: </span>
                <input value={editUser.password} onChange={e=>setEditUser({...editUser, password: e.target.value})}/>
            </section>
            <button onClick={updateUser}>Submit</button>
        </div>
    )
}

export default EditUser
