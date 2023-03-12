import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL } from '../../actions/types'

// const data = [
//     {
//         id          : 1,
//         firstname   : "Hasan",
//         lastname    : "Bakri",
//         email       : "hasanbakri@gmail.com",
//         image       : "image.png"
//     },
//     {
//         id          : 2,
//         firstname   : "Hasan",
//         lastname    : "Bakri",
//         email       : "hasanbakri@gmail.com",
//         image       : "image.png"
//     },
//     {
//         id          : 3,
//         firstname   : "Hasan",
//         lastname    : "Bakri",
//         email       : "hasanbakri@gmail.com",
//         image       : "image.png"
//     }
// ];

const handleEdit = () => {
    return alert('Data siap di edit !')
}
const handleDestroy = () => {
    return alert('Data siap di hapus !')
}
const User = () => {

    const[ data, setData ] = useState([])

    useEffect(() => {
        fetchUser()
    },[])

    const fetchUser = async() => {
        const response = await axios.get(`http://localhost:5555/api/users`)
        // console.log(response.data.data)
        setData(response.data.data)
    }
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className='mt-5'>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { data && data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <img src={`${BASE_URL}/public/images/users/${item.image}`} alt={item.firstname} width={'100'} height={'100'} />
                                            </td>
                                            <td>
                                                <button className={'btn btn-info btn-md mx-3'} onClick={handleEdit} > Edit </button>
                                                <button className={'btn btn-danger btn-md mx-3'} onClick={handleDestroy}> Hapus </button>
                                            </td>
                                        </tr>
                                    ))} 
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default User