import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { ApproveButtonCell, RejectButtonCell, AvatarCell } from "./TableRowComponent";
import {Column, OffDayRequest} from "../interfaces/OffDayRequest";

const CustomTableRow = ({ row, columns, handleApprove, handleReject }:{row:OffDayRequest,columns:Column[],handleApprove:(id: string) => void,handleReject:(id: string) => void}) => {


    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {columns.map((column) => {
                const value = row[column.id];
                if ((column.id === 'onay' || column.id === 'red') && row.durum !== 'Beklemede') return null;

                return (
                    <TableCell key={column.id} align={column.align}>
                    {column.id === 'onay' && row.durum === 'Beklemede' && (
                            <ApproveButtonCell key={column.id} onClick={() => handleApprove(row.id)} />
            )}
                {column.id === 'red' && row.durum === 'Beklemede' && (
                    <RejectButtonCell key={column.id} onClick={() => handleReject(row.id)} />
                )}
                {typeof value === 'string' && value.startsWith('https') && (
                    <AvatarCell key={column.id} value={value} />
                )}
                {typeof value === 'string' && !value.startsWith('https') && value}
                </TableCell>
            );
            })}
        </TableRow>
);
};

export default CustomTableRow;
