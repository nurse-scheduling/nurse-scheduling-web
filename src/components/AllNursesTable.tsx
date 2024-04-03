import React, {useContext, useEffect} from "react";
import {Avatar, Box, Skeleton, useMediaQuery, useTheme} from "@mui/material";
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
import {useFetchNurses} from "../apis/nurses";
import userContext from "../contexts/userContext";
import {NurseType} from "../types/NurseType";

interface Column {
    id: 'avatar' | 'ad_soyad' | 'departman';
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

function AllNursesTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const {basicAuth} = useContext(userContext);
    const {nurses, isLoading} = useFetchNurses(page, rowsPerPage, basicAuth);
    const navigate = useNavigate();
    const [data, setData] = React.useState<Data[]>([]);

    useEffect(() => {
        if (nurses) {
            const newData = nurses.map((nurse: NurseType) => {
                return {
                    avatar: nurse.profilePicture,
                    id: nurse.id,
                    ad_soyad: `${nurse.firstName} ${nurse.lastName}`,
                    departman: nurse.departmentName,
                };
            });
            setData(newData);
        }
    }, [nurses]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleRowClick = (id: string) => {
        navigate("/nurse/" + id);
    };

    return (
        <Box sx={{width: "100%", paddingTop: isMobile ? '75px' : '0px'}}>
            <Typography variant={isMobile ? "h4" : "h3"} component="h3" marginBottom={5} align="center" marginTop={5}>
                Hemşireler
            </Typography>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: '72.5vh'}}>
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
                                            fontSize: isMobile ? '12px' : 'inherit',
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                Array.from({length: 10}, (_, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row" height={56}>
                                            <Skeleton animation="wave" variant="circular">
                                                <Avatar/>
                                            </Skeleton>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton animation="wave" variant="text"/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton animation="wave" variant="text"/>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                data.map((row: Data) => (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        onClick={() => handleRowClick(row.id)}
                                        style={{cursor: "pointer"}}
                                    >
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'avatar' ? (
                                                    <Avatar sx={{width: 56, height: 56}} src={row.avatar}/>
                                                ) : (
                                                    <Typography variant="body1">{row[column.id]}</Typography>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export default AllNursesTable;
