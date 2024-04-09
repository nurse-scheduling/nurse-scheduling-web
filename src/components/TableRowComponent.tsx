import React from 'react';
import { Button, Avatar } from '@mui/material';

const AvatarCell = ({ value }: { value: string  }) => (
        <Avatar sx={{ width: 56, height: 56 }} src={value} />
);

const ApproveButtonCell = ({ onClick }: { onClick: () => void }) => (
        <Button variant="contained" color="success" size="large" onClick={onClick}>
            Onayla
        </Button>
);

const RejectButtonCell = ({ onClick }: { onClick: () => void }) => (
        <Button variant="contained" color="error" size="large" onClick={onClick}>
            Reddet
        </Button>
);


export { AvatarCell, ApproveButtonCell, RejectButtonCell };
