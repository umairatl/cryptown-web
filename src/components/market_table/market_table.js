import React from "react";

const Market_Table = () => {
  return (
    <div className="exchange-table">
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
                <p>Price</p>
              </TableCell>
              <TableCell className="table_h">
                <p>Market Cap</p>
              </TableCell>
              <TableCell className="table_h">
                <p>24 Volume Price</p>
              </TableCell>
              {user && (
                <TableCell className="table_h">
                  <p>Add to Watchlist</p>
                </TableCell>
              )}
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
                      {row.trust_score !== null ? row.trust_score : "N/A"} / 10
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
  );
};

export default Market_Table;
