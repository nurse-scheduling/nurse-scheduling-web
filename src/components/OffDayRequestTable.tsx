import React, {useContext, useEffect, useState} from "react";
import {Box, Button, ButtonGroup, Pagination, useMediaQuery, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {updateOffDayStatus, useFetchOffDays} from "../apis/offdayrequest";
import userContext from "../contexts/userContext";
import {OffDayType} from "../types/OffDayType";
import SkeletonLoaderList from "./SkeletonLoader";
import {Column, OffDayRequest} from "../interfaces/OffDayRequest";
import CustomTableRow from "./CustomTableRow";


const columns: Column[] = [
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

const statusMap: Record<string, Record<string, number>> = {
    'Beklemede': {'PENDING': 5},
    'Kabul': {'ACCEPTED': 3},
    'Red': {'REJECTED': 3}
};


function OffDayRequestTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);
    const [active, setActive] = useState("PENDING");
    const {basicAuth} = useContext(userContext);
    const {offDays, isLoading} = useFetchOffDays(page, rowsPerPage, basicAuth, active);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [data, setData] = useState<OffDayRequest[]>([]);
    const [skeletonCount, setSkeletonCount] = useState(5);


    useEffect(() => {
        if (offDays) {
            const newData = offDays.map((offDay: OffDayType) => {
                const {id, nurseName, nurseProfilePicture, date, status} = offDay;
                return {
                    avatar: nurseProfilePicture,
                    id: id,
                    ad_soyad: nurseName,
                    izin_tarih: date,
                    durum: status === 'PENDING' ? 'Beklemede' : status === 'ACCEPTED' ? 'Kabul' : 'Red',
                    onay: undefined,
                    red: undefined
                };
            });
            setData(newData);
        }
    }, [offDays]);


    const handleApprove = (id: string) => {
        updateOffDayStatus(id, 'ACCEPTED', basicAuth).then(updatedOffDay => {
            setData(prevData => {
                return prevData.filter(offDay => offDay.id !== updatedOffDay.id);
            });
        }).catch(error => {
            console.error('Approval failed:', error);
        });
    }

    const handleReject = (id: string) => {
        updateOffDayStatus(id, 'REJECTED', basicAuth).then(updatedOffDay => {
            setData(prevData => {
                return prevData.filter(offDay => offDay.id !== updatedOffDay.id);
            });
        }).catch(error => {
            console.error('Approval failed:', error);
        });
    }

    const handleChange = (title: string) => {
        const newActive = statusMap[title];
        if (newActive) {
            const activeKey = Object.keys(newActive)[0];
            const activeValue = newActive[activeKey];
            setPage(0);
            setActive(activeKey);
            setSkeletonCount(activeValue);
        }
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1)
    };


    return (
        <Box sx={{width: "100%", paddingTop: isMobile ? '75px' : '0px'}}>
            <Typography variant={isMobile ? "h4" : "h3"} component="h3" marginBottom={5} align={'center'} marginTop={5}>
                {"İzin Talepleri"}
            </Typography>
            <ButtonGroup style={{marginBottom: 25, marginLeft: 5}}>
                <Button variant={active === "PENDING" ? "contained" : "outlined"} onClick={() => {
                    handleChange("Beklemede")
                }}>
                    {"Beklemede"}
                </Button>
                <Button variant={active === "ACCEPTED" ? "contained" : "outlined"} onClick={() => {
                    handleChange("Kabul")
                }}>
                    {"Kabul"}
                </Button>
                <Button variant={active === "REJECTED" ? "contained" : "outlined"} onClick={() => {
                    handleChange("Red")
                }}>
                    {"Red"}
                </Button>
            </ButtonGroup>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: '72.5vh'}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <React.Fragment key={column.id}>
                                        {(column.id !== 'onay' && column.id !== 'red') || active === 'PENDING' ? (
                                            <TableCell
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
                                        ) : null}
                                    </React.Fragment>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <SkeletonLoaderList rowCount={10} cellCount={skeletonCount} avatar={true}/>
                            ) : (
                                data
                                    .slice(0, rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <CustomTableRow row={row} columns={columns} handleApprove={handleApprove}
                                                            handleReject={handleReject}/>
                                        );
                                    }))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination onChange={handleChangePage} page={page + 1} count={data.length}/>
            </Paper>
        </Box>
    )
}

export default OffDayRequestTable;
