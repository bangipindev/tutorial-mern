import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_URL } from '../../actions/types'

const EditUser = () => {

    const { id }                        = useParams()
    const [firstname, setFirstname]     = useState('')
    const [lastname, setLastname]       = useState('')
    const [email, setEmail]             = useState('')
    const [password, setPassword]       = useState('')
    const [image, setImage]             = useState('')
    const [labelimage, setLabelImage]   = useState('')
    const [invalidFile, setInvalidFile] = useState(false)
    const navigate                      = useNavigate()
    const [submitted, setSubmitted]     = useState(false)

    useEffect(() => {
        fetchUser() // eslint-disable-next-line
    },[])

    const fetchUser = async() => {
        const response = await axios.get(`${API_URL}/users/${id}`)
        setFirstname(response.data.data.firstname)
        setLastname(response.data.data.lastname)
        setEmail(response.data.data.email)
    }

    const handleFile = (e) => {
        const images        = e.target.files[0]
        
        const {size, name}  = images
        const maxSize       = 500000

        if(size < maxSize){
            setLabelImage(name)
            setInvalidFile(false)
            setImage(images)
        }else{
            setLabelImage('')
            setInvalidFile(true)
            setImage('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)

        const form = new FormData()
        form.append("firstname", firstname)
        form.append("lastname", lastname)
        form.append("email", email)
        form.append("password", password)
        form.append("image", image)

        const options = {
            headers : { 'Content-Type' : 'Application/json'},
            body    : JSON.stringify(form)
        }

        return axios.put(`${API_URL}/users/${id}`, form , options)
        .then((response) => {
            toast.success(response.data.message)
            setTimeout(() => {
                navigate('/user')
            },2000)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className={'mt-5'}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="firstname">
                                    <Form.Label>Firstname</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Firstname"  value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="lastname">
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" className={submitted + !email ? 'is-ivalid' : ''} value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                    {submitted && !email && <div className='help-block text-danger text-left' >Email invalid</div>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" className={submitted + !password ? 'is-ivalid' : ''} value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    {submitted && !password && <div className='help-block text-danger text-left' >Password invalid</div>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" placeholder="Insert Image" label={labelimage || 'choose file'} onChange={handleFile} invalid={invalidFile ? invalidFile.toString() : ''} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EditUser