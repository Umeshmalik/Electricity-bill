import React, { useEffect } from 'react';
import axios from 'axios';
import { Table, Box, Paper, TableContainer, TableHead, TableRow, TableCell, TableSortLabel, TablePagination, Button } from '@mui/material';
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
    useEffect(() => {
        getData()
    }, [])

    const getData = async (props) => {
        const { limit, page, sort } = props || {};
        const buildUrl = `${import.meta.env.VITE_SERVER_URL}?${(() => limit ? '&limit=' + limit : '')()}${(() => page ? '&page=' + page : '')()}${((() => sort ? '&sort=' + sort : '')())}`;
        await axios.get(buildUrl)
            .then(res => {
                const { data = {} } = res;
                setData(data?.data?.docs)
                setTotalRows(data?.data?.total)
            })
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getData({page: newPage + 1, limit: rowsPerPage, sort: sortBy})
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getData({limit: parseInt(event.target.value, 10), page: 1, sort: sortBy })
    };

    const onRequestSort = (event, property) => {
        if ( property !== 'amount' || property === sortBy) return
        setSortBy('amount')
        getData({limit: rowsPerPage, page: 1, sort: 'amount'})
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, padding: 2 }}>
                <Button style={{float:'right'}} variant='contained' color="success" onClick={() => navigate('/addBill')}>Add new</Button>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            orderBy= {sortBy}
                            order="desc"
                            onRequestSort = {onRequestSort}
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
                                            {index+1}
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
                <TablePagination
                    rowsPerPageOptions={[2, 3, 9, 90, 900]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
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