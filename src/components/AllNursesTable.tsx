import React from "react";
import {Avatar, Box, Button, useMediaQuery, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {useNavigate} from "react-router-dom";


interface Column {
    id: 'avatar' | 'ad_soyad' | 'departman' ;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
    {id: 'avatar', label: '', minWidth: 50, align: 'center'},
    {id: 'ad_soyad', label: 'Ad Soyad', minWidth: 100, align: 'center'},
    {id: 'departman', label: 'Departman', minWidth: 100, align: 'center'},

];

interface Data {
    avatar: string;
    id: string;
    ad_soyad: string;
    departman: string;
}

function createData(
    avatar: string,
    id: string,
    ad_soyad: string,
    departman: string,
): Data {
    return {avatar, id, ad_soyad, departman,};
}

const rows = [
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW23", 'Mert Batuhan Ünverdi',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW24", 'Hüseyin Emre Üğdül',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW25", 'Mert Batuhan Ünverdi',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW26", 'Hüseyin Emre Üğdül',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW27", 'Mert Batuhan Ünverdi',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW28", 'Hüseyin Emre Üğdül',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW29", 'Mert Batuhan Ünverdi',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW30", 'Hüseyin Emre Üğdül',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW31", 'Mert Batuhan Ünverdi',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW32", 'Hüseyin Emre Üğdül',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW33", 'Mert Batuhan Ünverdi',  "Dahiliye",),
    createData("https://cdn-icons-png.flaticon.com/512/8496/8496122.png", "CW34", 'Hüseyin Emre Üğdül',  "Dahiliye",),
];


function AllNursesTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleRowClick = (row: Data) => {
        navigate("/nurse")
    };

    return (
        <Box sx={{ width: "100%", paddingTop: isMobile ? '75px' : '0px' }}>
            <Typography variant={isMobile ? "h4" : "h3"} component="h3" marginBottom={5} align={'center'} marginTop={5}>
                {"Hemşireler"}
            </Typography>
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
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            onClick={() => handleRowClick(row)} // Handle row click
                                            style={{ cursor: "pointer" }}
                                        >
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

export default AllNursesTable;
