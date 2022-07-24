import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Box, Typography, CardContent, Button, FormLabel, Input } from '@mui/material';
import moment from 'moment';

const EditBill = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({
        billId: '',
        billDate: '',
        billPaidDate: '',
        unitConsumed: 0,
        amount: 0
    });
    const [loading, setLoading] = useState(params.id ? true : false);
    const [error, setError] = useState(null);
    const [billId, setBillId] = useState()
    const [billDate, setBillDate] = useState();
    const [billPaidDate, setBillPaidDate] = useState();
    const [amount, setAmount] = useState(data?.amount);
    const [unitConsumed, setUnitConsumed] = useState(data?.unitConsumed);
    useEffect(() => {
        if (params?.id) getData();
    }, [])

    const getData = async () => {
        await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/bill/${params.id}`)
            .then(res => {
                const { data } = res;
                setData(data.data)
                setBillId(data.data.billId)
                setBillDate(moment(data?.data?.billDate).format("yyyy-MM-DD"))
                setBillPaidDate(moment(data?.data?.billPaidDate).format("yyyy-MM-DD"))
                setAmount(data?.data?.amount)
                setUnitConsumed(data?.data?.unitConsumed)
                setLoading(false)
            })
    }

    const editBill = async () => {
        if (!billDate || !billPaidDate || !amount || !unitConsumed) {
            setError("Please fill all the fields")
            return
        }
        await axios.put(`${import.meta.env.VITE_SERVER_ENDPOINT}/${params.id}/edit`, {
            data: {
                billDate,
                billPaidDate,
                unitConsumed,
                amount,
            }
        })
        .then(res => {
            console.log("Data Updated")
            navigate("/")
        })
        setError(null)
    }

    const addBill = async () => {
        if (!billDate || !billPaidDate || !amount || !unitConsumed) {
            setError("Please fill all the fields")
            return
        }
        await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}`, {
            billDate,
            billPaidDate,
            unitConsumed,
            amount
        }).then(res => {
            console.log("Data Saved")
            navigate("/")
        }).catch(err => {
            console.log(err)
        })
        setError(null)
    }

    return !loading && data && (
        <Box sx={{ minWidth: 370, margin: "1rem" }}>
            {error && (<Typography variant='p' align="center" color="red">{error}</Typography>)}
            <Card>
                <Typography variant='h5' align="center">
                    {params?.id ? "Edit" : "Add"} Bill Details
                </Typography>
                <CardContent>
                    <table>
                        <tbody>
                            {
                                params?.id &&
                                <tr>
                                    <td>
                                        <FormLabel>Bill Id:</FormLabel>
                                    </td>
                                    <td>
                                        <Input defaultValue={billId} disabled onChange={(e) => setBillId(e.target.value)} />
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td>
                                    <FormLabel>Bill Date:</FormLabel>
                                </td>
                                <td>
                                    <Input type='date' defaultValue={billDate} onChange={(e) => setBillDate(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Bill Paid Date:</FormLabel>
                                </td>
                                <td>
                                    <Input type='date' defaultValue={billPaidDate} onChange={(e) => setBillPaidDate(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Amount:</FormLabel>
                                </td>
                                <td>
                                    <Input defaultValue={amount} onChange={(e) => setAmount(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Unit Consumed:</FormLabel>
                                </td>
                                <td>
                                    <Input defaultValue={unitConsumed} onChange={(e) => setUnitConsumed(e.target.value)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <Button onClick={ params?.id ? editBill : addBill } variant='contained' color="success">Save</Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default EditBill