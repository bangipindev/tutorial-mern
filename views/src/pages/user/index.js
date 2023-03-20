import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import axios from 'axios'
import { API_URL, BASE_URL } from '../../actions/types'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

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

    
    const handleDestroy = (id) => {
        return (
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText:'No, Cancel',
                reverseButtons: true
            })
            .then((e) => {
                if (e.isConfirmed) {
                    axios.delete(`${API_URL}/users/${id}`)
                    .then((result) => {
                        Swal.fire(
                            'Deleted!',
                            result.data.message,
                            'success'
                        )
                        // toast.success(result.data.message)
                        setTimeout(() => {
                            fetchUser()
                        },2000)
                    }).catch((err)=>{
                        toast.error(err.response.data.message)
                    })
                    
                }else if (e.dismiss === 'cancel') {
                    Swal.fire('Batal', 'upps.. tidak jadi :)','error')
                }
            })
            
        )
    }
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Link to="/user/add">
                            <Button className={'btn btn-info mb-2 mt-2'}><FontAwesomeIcon icon={faPlus} /> Tambah</Button>
                        </Link>
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
                                            <Link to={`/user/edit/${item.id}`} className={'btn btn-info btn-md mx-3'} > Edit </Link>
                                            <Link to="#" className={'btn btn-danger btn-md mx-3'} onClick={() => handleDestroy(item.id)}> Hapus </Link>
                                        </td>
                                    </tr>
                                ))} 
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default User