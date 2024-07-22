"use client"
import React from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@/components/index';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import { Box, MenuItem } from '@mui/material';
import { locale } from '@/app/data/head';
import { Helpers } from '@/app/utils';

export default function PopperPopupState(props: {
  label: any,
  data?: any,
  startIcon?: any,
}) {
  const {
    label,
    data,
    startIcon
  } = props

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const anchorId = open ? 'simple-popper' : undefined;

  return (
    <div>
      <Button aria-describedby={anchorId} handleClick={handleClick} label={label} startIcon={startIcon}/>
      <Popper id={anchorId} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
          {
            data &&
            data.length > 0 &&
            data.map((item: { id: any; label: string | TrustedHTML; name: string | TrustedHTML; }, index: string) => {
              return (
                <MenuItem
                  key={'dropdown-' + index}
                  value={item.id ? item.id : item.label ? item.label : item.name}
                >
                  <div dangerouslySetInnerHTML={{ __html: locale({ label: item.label ? item.label : item.name }) }} />

                </MenuItem>

              )
            }
            )
          }
        </Box>
      </Popper>
    </div>
  );
}
