"use client";
import React, { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Typography, Radio, Box, Button, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Colors } from "@/theme/color";
import { Rate } from "@/lib/definitions";
import { handlePath } from "@/lib/utils/helper";

const StyledBox = styled(Grid)(({ theme }) => ({
  width: "30%",
  border: `1px solid rgba(0, 0, 0, 0.12)`,
  borderRadius: "8px",
  height: "100px",
  padding: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  "&:hover": {
    borderColor: Colors.DarkBlue,
    transform: "scale(1.05)",
    transition: "transform 0.3s ease-in-out",
    color: Colors.DarkBlue,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const FixedRateSelection = ({ data }: { data: Rate[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = 1;
  const isDisabled = useMemo(() => {
    return step !== 1;
  }, [step]);
  const currentParams = new URLSearchParams(searchParams.toString());
  const selectedRateId = currentParams.get("rateId");

  const handleRadioChange = (newRateId: string) => {
    const currentParams = new URLSearchParams(searchParams.toString()); // Convert to URLSearchParams for easy manipulation
    currentParams.set("rateId", newRateId); // Update the rateId parameter
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };

  const handleNextStep = () => {
    if (typeof window !== "undefined") {
      const { newPath, newSearch } = handlePath();
      router.push(newPath + "/review" + newSearch);
    }
  };
  return (
    <>
      <Grid container spacing={2} justifyContent="flex-start">
        {data.map((rate) => (
          <StyledBox
            sx={{
              pointerEvents: isDisabled ? "none" : "auto",
              opacity: isDisabled && selectedRateId !== rate.rateId ? 0.5 : 1,
              cursor: isDisabled ? "not-allowed" : "default",
              ...(selectedRateId === rate.rateId
                ? { borderColor: Colors.DarkBlue, color: Colors.DarkBlue }
                : {}),
            }}
            key={rate.rateId}
            onClick={() => {
              if (isDisabled) {
                return;
              }
              return handleRadioChange(rate.rateId);
            }}
          >
            <Radio
              checked={selectedRateId === rate.rateId}
              disabled={isDisabled}
            />
            <Box sx={{ ml: 1 }}>
              <Typography>
                {Number.isInteger(rate.period)
                  ? `${rate.period} ${rate.period === 1 ? "Year" : "Years"}`
                  : `${Math.round(rate.period * 12)} Months`}
              </Typography>
              <Typography variant="h3">
                {rate.fixedRate}%{" "}
                <span style={{ fontSize: "0.75em" }}>p.a.</span>
              </Typography>
            </Box>
          </StyledBox>
        ))}
      </Grid>

      {!isDisabled && (
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedRateId}
            onClick={handleNextStep}
          >
            Next Step
          </Button>
        </Box>
      )}
    </>
  );
};

export default FixedRateSelection;
