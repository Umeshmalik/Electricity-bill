import React, { useEffect } from 'react';
import axios from 'axios';
import { Table, Box, Paper, TableContainer, TableHead, TableRow, TableCell, TableSortLabel, Button } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import moment from 'moment'
import { headCells } from "./constants"
import { useState } from 'react';
import { useNavigate } from "react-router-dom"

const TableComp = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState('billId');
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        getData({ limit: rowsPerPage, page, sort: sortBy });
    }, [])

    const getData = async (props) => {
        const { limit, page, sort } = props || {};
        const buildUrl = `${import.meta.env.VITE_SERVER_ENDPOINT}?${(() => limit ? '&limit=' + limit : '')()}${(() => page ? '&page=' + page : '')()}${((() => sort ? '&sort=' + sort : '')())}`;
        await axios.get(buildUrl)
            .then(res => {
                const { data = {} } = res;
                setData(data?.data?.docs)
                setTotalRows(data?.data?.total)
                setTotalPages(data?.data?.pages)
                setPage(parseInt(data?.data?.page))
            })
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getData({ page: newPage + 1, limit: rowsPerPage, sort: sortBy })
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getData({ limit: parseInt(event.target.value, 10), page: 1, sort: sortBy })
    };

    const onRequestSort = (event, property) => {
        if (property !== 'amount' || property === sortBy) return
        setSortBy('amount')
        getData({ limit: rowsPerPage, page: 1, sort: 'amount' })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, padding: 2 }}>
                <Button style={{ float: 'right' }} variant='contained' color="success" onClick={() => navigate('/addBill')}>Add new</Button>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            orderBy={sortBy}
                            order="desc"
                            onRequestSort={onRequestSort}
                        />
                        <tbody>
                            {data.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.billId}
                                    >
                                        <TableCell>
                                            {index + 1 + ((page - 1) * rowsPerPage)}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.billId}
                                        </TableCell>
                                        <TableCell>{moment(row.billDate).format('MMMM Do YYYY')}</TableCell>
                                        <TableCell>{moment(row.billPaidDate).format('MMMM Do YYYY')}</TableCell>
                                        <TableCell>{row.unitConsumed}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                        <TableCell>{moment(row.createdAt).format('MMMM Do YYYY')}</TableCell>
                                        <TableCell>{moment(row.updatedAt).format('MMMM Do YYYY')}</TableCell>
                                        <TableCell><Button onClick={() => navigate(`/bill/${row.billId}`)}>View</Button></TableCell>
                                        <TableCell><Button onClick={() => navigate(`/${row.billId}/edit`)}>Edit</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                        </tbody>
                    </Table>
                </TableContainer>
                <div style={{ height: "50px", display: "flex", justifyContent: "flex-end", alignContent: "center" }}>
                    <section style={{ backgroundColor: "#007bff", borderRadius: "10px", alignContent: "center", marginRight: "10px"}}>
                        <select value={rowsPerPage} onChange={handleChangeRowsPerPage} style={{height:"100%",  borderRadius: "10px"}}>
                            <option value={1}>1 Record</option>
                            <option value={5}>5 Records</option>
                            <option value={10}>10 Records</option>
                            <option value={25}>25 Records</option>
                        </select>
                    </section>
                    <section style={{ backgroundColor: "#007bff", borderRadius: "5px", alignContent: "center" }}>
                        {
                            page > 2 && totalPages > 3 && <Button style={{ backgroundColor: page === 1 ? "rgb(0, 150, 55)" : "white", color: page === 1 ? "whitesmoke" : "#007bff", borderRadius: "5px", margin: "5px" }} onClick={() => getData({ limit: rowsPerPage, page: 1, sort: sortBy })}>1</Button>
                        }
                        {
                            page > 3 && <Button style={{ backgroundColor: "white", borderRadius: "5px", margin: "5px" }}>...</Button>
                        }
                        {
                            Array.from({ length: totalPages }, (x, i) => {
                                const pageNumber = page  + 2 < totalPages ? page : totalPages - 2;
                                if (pageNumber < 2) return i + 1
                                else return (pageNumber - 2) + i + 1
                            }).slice(0, 3).map(p => {
                                return <Button
                                    key={p}
                                    style={{ backgroundColor: page === p ? "rgb(0, 150, 55)" : "white",  color: p === page ? "whitesmoke" : "#007bff", borderRadius: "5px", margin: "5px" }}
                                    onClick={() => getData({ limit: rowsPerPage, page: p, sort: sortBy })}
                                >
                                    {p}
                                </Button>
                            })
                        }
                        {
                            totalPages - page > 2 && <Button style={{ backgroundColor: "white", borderRadius: "5px", margin: "5px" }} > ... </Button>
                        }
                        {
                            totalPages > 4 && <Button style={{ backgroundColor: page === totalPages ? "rgb(0, 150, 55)" : "white", color: page === {totalPages} ? "whitesmoke" : "#007bff", borderRadius: "5px", margin: "5px" }} onClick={() => getData({ limit: rowsPerPage, page: totalPages, sort: sortBy })}> {totalPages} </Button>
                        }
                    </section>
                </div>
            </Paper>
        </Box>
    )
}

const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default TableComp