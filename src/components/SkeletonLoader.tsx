import React from 'react';
import TableCell from "@mui/material/TableCell";
import { Avatar, Skeleton } from "@mui/material";
import TableRow from "@mui/material/TableRow";

const SkeletonLoader = ({ cellCount, avatar }: { cellCount: number, avatar: boolean }) => {
    const renderSkeletonCells = () => {
        const skeletonCells = [];

        for (let index = 0; index < cellCount; index++) {
            skeletonCells.push(
                <TableCell key={index}>
                    <Skeleton animation="wave" variant="text" />
                </TableCell>
            );
        }
        return skeletonCells;
    };

    return (
        <TableRow>
            {avatar && (
                <TableCell component="th" scope="row" height={56}>
                    <Skeleton animation="wave" variant="circular">
                        <Avatar />
                    </Skeleton>
                </TableCell>
            )}
            {renderSkeletonCells()}
        </TableRow>
    );
};

const SkeletonLoaderList = ({ rowCount, cellCount, avatar }: { rowCount: number, cellCount: number, avatar: boolean }) => {
    const renderSkeletonLoaders = () => {
        const skeletonLoaders = [];

        for (let index = 0; index < rowCount; index++) {
            skeletonLoaders.push(
                <SkeletonLoader key={index} cellCount={cellCount} avatar={avatar} />
            );
        }
        return skeletonLoaders;
    };

    return (
        <>
            {renderSkeletonLoaders()}
        </>
    );
};

export default SkeletonLoaderList;
