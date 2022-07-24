import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Box, Typography, CardContent, Button } from '@mui/material';
import moment from 'moment';

const BillView = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState();
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await axios.get(`${import.meta.env.VITE_SERVER_URL}/bill/${params.id}`)
            .then(res => {
                const { data } = res;
                setData(data.data)
            })
    }

    const deleteBill = async () => {
        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete/${params.id}`)
            .then(res => {
                const { data } = res;
                navigate("/")
            })
    }

    return data && (
        <Box sx={{ minWidth: 275, margin: "3rem" }}>
            <Card style={{ padding: '2rem' }}>
                <CardContent>
                    <Typography variant='h4' align="center" margin={4} >
                        <strong>Bill No.</strong> <u>{data.billId}</u>
                    </Typography>
                    <Typography variant='p' align="center">
                        <strong>Bill Date:</strong> {moment(data.billDate).format('MMMM Do YYYY')}
                    </Typography>
                    <br />
                    <Typography variant='p' align="center">
                        <strong>Bill Paid Date:</strong> {moment(data.billPaidDate).format('MMMM Do YYYY')}
                    </Typography>
                    <br />
                    <Typography variant='p' align="center">
                        <strong>Units Consumed:</strong> {data.unitConsumed}
                    </Typography>
                    <br />
                    <Typography variant='p' align="center">
                        <strong>Amount :</strong> {data.amount}
                    </Typography>
                    <br />
                    <Button variant='contained' color='error' style={{ float: "right" }} onClick={deleteBill}> Delete </Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default BillView