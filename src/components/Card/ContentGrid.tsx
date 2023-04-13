import React, { FC } from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

interface GridItem {
    label: string;
    value: string;
}

interface ContentGridItems extends Array<GridItem> {}

interface ContentGridProps {
    gridContents: ContentGridItems;
}

const ContentGrid: FC<ContentGridProps> = ({ gridContents }) => {
    return (
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            {gridContents.map((gridContent, index) => {
                return (
                    <Grid item xs={12} md={6} key={index}>
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <Typography variant="h6">
                                {gridContent.label}
                            </Typography>
                            <Typography>{gridContent.value}</Typography>
                        </div>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ContentGrid;
