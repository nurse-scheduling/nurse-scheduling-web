import React from "react";
import SideBar from "../../components/SideBar";
import {Avatar, Box, Button, ButtonGroup} from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';


interface Column {
    id: 'avatar' | 'ad_soyad' | 'izin_tarih' | 'durum' | 'onay' | 'red';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
    {id: 'avatar', label: '', minWidth: 50, align: 'center'},
    {id: 'ad_soyad', label: 'Ad Soyad', minWidth: 100, align: 'center'},
    {id: 'izin_tarih', label: 'İzin İstenilen Tarih', minWidth: 100, align: 'center'},
    {
        id: 'durum',
        label: 'Durum',
        minWidth: 50,
        align: 'center',
    },
    {
        id: 'onay',
        label: 'Onayla',
        minWidth: 50,
        align: 'center',
    },
    {
        id: 'red',
        label: 'Reddet',
        minWidth: 50,
        align: 'center',

    },
];

interface Data {
    avatar: string;
    id: string;
    ad_soyad: string;
    izin_tarih: string;
    durum: string;
    onay: void;
    red: void;
}

function createData(
    avatar: string,
    id: string,
    ad_soyad: string,
    izin_tarih: string,
    durum: string,
    onay: void,
    red: void
): Data {
    return {avatar, id, ad_soyad, izin_tarih, durum, onay, red};
}

const rows = [
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW23", 'Mert Batuhan Ünverdi', '13.12.2023', "Beklemede",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW24", 'Hüseyin Emre Üğdül', '13.12.2023', "Beklemede",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW25", 'Mert Batuhan Ünverdi', '16.12.2023', "Beklemede",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW26", 'Hüseyin Emre Üğdül', '14.12.2023', "Beklemede",),
];

function OffDayRequests() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [active, setActive] = React.useState("Beklemede");

    const handleChange = (title: string) => {
        setActive(title);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box sx={{display: "flex"}}>
            <Box>
                <SideBar></SideBar>
            </Box>
            <Box sx={{width: "100%"}}>
                <Typography variant="h3" component="h3" marginBottom={5} align={'center'} marginTop={5}>
                    İzin Talepleri
                </Typography>
                <ButtonGroup style={{marginBottom: 25, marginLeft: 5}}>
                    <Button variant={active === "Beklemede" ? "contained" : "outlined"} onClick={() => {
                        handleChange("Beklemede")
                    }}>Beklemede</Button>
                    <Button variant={active === "Kabul" ? "contained" : "outlined"} onClick={() => {
                        handleChange("Kabul")
                    }}>Kabul Edilenler</Button>
                    <Button variant={active === "Red" ? "contained" : "outlined"} onClick={() => {
                        handleChange("Red")
                    }}>Red Edilenler</Button>
                </ButtonGroup>
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 440}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                                backgroundColor: "#3788d8",
                                                color: "white"
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {typeof value !== 'string' ? <Button variant={"contained"}
                                                                                                 color={column.label === "Onayla" ? "success" : "error"}
                                                                                                 size={"large"}>{column.label}</Button> :
                                                                value.startsWith("https") ?
                                                                    <Avatar sx={{width: 56, height: 56}}
                                                                            src={value}/> : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Box>

    )

}


export default OffDayRequests;
