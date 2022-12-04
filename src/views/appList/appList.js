import * as React from "react";
import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../appList/appList.css";
import Navbar from "../../components/navbar/navbar";
import ExchangeListHeader from "./applistheader/appListheader";
import BasicSteps from "./steps/basicsteps";
import Footer from "../../components/footer/footer";

function createData(rank, name, year, score, country, trade_volume) {
  return { rank, name, year, score, country, trade_volume };
}

const AppList = () => {
  var rows = [];
  var [exchangeList, setExchangeList] = useState(null);

  useEffect(() => {
    const fetchExchangeList = async () => {
      const response = await axios("api/exchange");
      const json = await response.data;

      if (response.status === 200) {
        setExchangeList(json);
      }
    };
    fetchExchangeList();
  }, []);

  exchangeList &&
    exchangeList.exchange.forEach((res) =>
      rows.push(
        createData(
          res.trust_score_rank,
          res.image,
          res.name,
          res.year_established,
          res.trust_score,
          res.country,
          res.trade_volume_24h_btc
        )
      )
    );

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div>
      <Navbar />
      <ExchangeListHeader />

      <div className="set-appList">
        <h3
          className="exlistsecheader"
          data-aos="fade-down"
          data-aos-duration="3000">
          List of <span id="colortextnine"> Platform</span>
        </h3>
        <br></br>

        <div
          className="exchange-table"
          data-aos="fade-up"
          data-aos-duration="3000">
          <TableContainer component={Paper}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className="table_h">
                    <p>Ranking</p>
                  </TableCell>
                  <TableCell className="table_h">
                    <p>Name</p>
                  </TableCell>
                  <TableCell className="table_h">
                    <p>Country</p>
                  </TableCell>
                  <TableCell className="table_h">
                    <p>Established</p>
                  </TableCell>
                  <TableCell className="table_h">
                    <p>Trust Score</p>
                  </TableCell>
                  <TableCell className="table_h">
                    <p>Trade Volume 24h BTC</p>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {exchangeList &&
                  exchangeList.exchange.map((row) => (
                    <TableRow
                      key={row.name}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        window.open(row.url, "_blank");
                      }}>
                      <TableCell>
                        <p>{row.trust_score_rank} </p>
                      </TableCell>
                      <TableCell className="overflow-table line-height-t row-tbl-coin">
                        <div className="flex-d-row">
                          <img src={row.image} width="45px"></img>
                          <p className="coin-name-col"> {row.name} </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p>{row.country !== null ? row.country : "N/A"}</p>
                      </TableCell>
                      <TableCell>
                        <p>
                          {row.year_established !== null
                            ? row.year_established
                            : "N/A"}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p>
                          {row.trust_score !== null ? row.trust_score : "N/A"} /
                          10
                        </p>
                      </TableCell>
                      <TableCell>
                        <p>
                          {row.trade_volume_24h_btc !== null
                            ? formatter.format(row.trade_volume_24h_btc)
                            : "N/A"}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <BasicSteps />
      <Footer />
    </div>
  );
};

export default AppList;
