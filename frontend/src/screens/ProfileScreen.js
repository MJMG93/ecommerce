import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({ location, history }) => {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user.email) {
                dispatch(getUserDetails('profile'))
            } else {
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
        //dispatch update profile
        dispatch(updateUserProfile({ id: user._id, first_name, last_name, email, password }))
        }
    }


    return (
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader />}
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

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>my orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
