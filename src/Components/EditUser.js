import {useContext, useState, useEffect} from 'react'
import {UserContext} from '../context/UserContext'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const EditUser = ({...props}) => {
    const [editUser, setEditUser] = useState({new_password: '', first_name: '', last_name: '', original_password: ''})
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
        var reg = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/);
        console.log(reg.test(editUser.new_password))
        return reg.test(editUser.new_password);
    }

    const checkName = (n) => {
        //can only contain letters a , . ' or -
        let reg = new RegExp(/^[a-z ,.'-]+$/i);
        console.log(reg.test(n))
        return reg.test(n);
    }
    
    const updateUser=()=>{
        const {new_password, original_password, first_name, last_name} = editUser
        console.log('button clicked')
        if(checkPassword() && checkName(first_name) && checkName(last_name)){
            console.log('sent to server')
            axios.put(`/auth/user`, {first_name, last_name, new_password, original_password})
            .then(({data})=>{
                userValue.setUser(data)
                userValue.getRecommendedGames();
                history.push(`/home`)
            })
            .catch(err=>console.log(err))
        }
    }

    return (
        <div className="edit-page">
            <div className="edit-user">
                <section className="row">
                    <label>
                        <span>First Name: </span>
                        <input value={editUser.firstName} onChange={e=>setEditUser({...editUser, first_name: e.target.value})}/>
                    </label>
                </section>
                <section className="row">
                    <label>
                        <span>Last Name: </span>
                        <input value={editUser.lastName} onChange={e=>setEditUser({...editUser, last_name: e.target.value})}/>
                    </label>
                </section>
                <section className="row">
                    <label>
                        <span>Password: </span>
                        <input value={editUser.original_password} onChange={e=>setEditUser({...editUser, original_password: e.target.value})}/>
                    </label>
                </section>
                <section className="row">
                    <label>
                        <span>New Password: </span>
                        <input value={editUser.new_password} onChange={e=>setEditUser({...editUser, new_password: e.target.value})}/>
                    </label>
                </section>
                <button onClick={updateUser}>Submit</button>
            </div>
        </div>
    )
}

export default EditUser
