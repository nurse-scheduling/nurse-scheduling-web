import React from "react";
import {Avatar, Box, Button, ButtonGroup, useMediaQuery, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";


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
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW27", 'Mert Batuhan Ünverdi', '16.12.2023', "Beklemede",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW28", 'Hüseyin Emre Üğdül', '14.12.2023', "Beklemede",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW29", 'Mert Batuhan Ünverdi', '16.12.2023', "Beklemede",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW30", 'Hüseyin Emre Üğdül', '14.12.2023', "Beklemede",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW31", 'Mert Batuhan Ünverdi', '16.12.2023', "Beklemede",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW32", 'Hüseyin Emre Üğdül', '14.12.2023', "Beklemede",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW33", 'Mert Batuhan Ünverdi', '16.12.2023', "Beklemede",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW34", 'Hüseyin Emre Üğdül', '14.12.2023', "Beklemede",),
];


function OffDayRequestTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [active, setActive] = React.useState("Beklemede");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        <Box sx={{ width: "100%", paddingTop: isMobile ? '75px' : '0px' }}>
            <Typography variant={isMobile ? "h4" : "h3"} component="h3" marginBottom={5} align={'center'} marginTop={5}>
                {"İzin Talepleri"}
            </Typography>
            <ButtonGroup style={{ marginBottom: 25, marginLeft: 5 }}>
                <Button variant={active === "Beklemede" ? "contained" : "outlined"} onClick={() => { handleChange("Beklemede") }}>
                    {"Beklemede"}
                </Button>
                <Button variant={active === "Kabul" ? "contained" : "outlined"} onClick={() => { handleChange("Kabul") }}>
                    {"Kabul"}
                </Button>
                <Button variant={active === "Red" ? "contained" : "outlined"} onClick={() => { handleChange("Red") }}>
                    {"Red"}
                </Button>
            </ButtonGroup>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: '72.5vh' }}>
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
                                            color: "white",
                                            fontSize: isMobile ? '12px' : 'inherit', // Adjust font size for mobile
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
                                                                <Avatar sx={{ width: 56, height: 56 }}
                                                                        src={value} /> : value}
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
    )
}

export default OffDayRequestTable;
