import React from "react";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

type PageHeaderProps = {
  title: string;
  onBack: () => void;
};

export function PageHeader({ title, onBack }: Readonly<PageHeaderProps>) {
  return (
    <Box sx={{ mb: 3 }}>
      <Tooltip title="Back">
        <IconButton
          onClick={onBack}
          sx={{
            mb: 2,
            "&:hover": {
              backgroundColor: "rgba(255, 105, 180, 0.1)",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
      >
        {title}
      </Typography>
    </Box>
  );
}
