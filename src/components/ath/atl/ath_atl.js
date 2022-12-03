import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const ATH_ATL = (detail) => {
  const [data, setData] = useState(detail.detail[0]);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    setCurrency(detail.detail[1]);
  }, [detail]);

  return (
    <div>
      {data ? (
        <div>
          {currency === 20 ? (
            <div>
              <Card className="card-atl">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom>
                    All Time High (ATH)
                  </Typography>

                  <Typography
                    className="ath_price"
                    variant="h3"
                    component="div">
                    {data.ath.myr}{" "}
                  </Typography>
                  <Typography className="ath_percentage_col" variant="body1">
                    MYR Change Percentage : <br></br>{" "}
                    {data.ath.change_percentage_myr}
                  </Typography>
                </CardContent>
              </Card>

              <Card className="card-atl">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom>
                    All Time Low (ATL)
                  </Typography>

                  <Typography
                    className="ath_price"
                    variant="h3"
                    component="div">
                    {data.atl.myr}{" "}
                  </Typography>
                  <Typography className="ath_percentage_col" variant="body1">
                    MYR Change Percentage : <br></br>{" "}
                    {data.atl.change_percentage_myr}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              <Card className="card-atl">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom>
                    All Time High (ATH)
                  </Typography>

                  <Typography
                    className="ath_price"
                    variant="h3"
                    component="div">
                    {data.ath.usd}{" "}
                  </Typography>
                  <Typography className="ath_percentage_col" variant="body1">
                    USD Change Percentage : <br></br>{" "}
                    {data.ath.change_percentage_usd}
                  </Typography>
                </CardContent>
              </Card>

              <Card className="card-atl">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom>
                    All Time Low (ATL)
                  </Typography>

                  <Typography
                    className="ath_price"
                    variant="h3"
                    component="div">
                    {data.atl.usd}{" "}
                  </Typography>
                  <Typography className="ath_percentage_col" variant="body1">
                    USD Change Percentage : <br></br>{" "}
                    {data.atl.change_percentage_usd}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ATH_ATL;
