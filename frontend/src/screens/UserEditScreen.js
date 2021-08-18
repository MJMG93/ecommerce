import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate


    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userList')
        } else{
            if(!user.email || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        
    }, [dispatch, history, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, first_name, last_name, email, isAdmin }))
    }




    return (
        <>
            <Link to='/admin/userList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
                : 
                (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='first_name'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter first name' value={first_name} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                    </Form.Group>
                
                    <Form.Group controlId='last_name'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter last name' value={last_name} onChange={(e) => setLastName(e.target.value)}></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                
                    {/* <Form.Group controlId='isadmin'>
                        <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                    </Form.Group> */}

                    <Form.Group controlId='isAdmin'>
                        <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>
                
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
                )}
                
            </FormContainer>
        </>
        
    )
}

export default UserEditScreen
