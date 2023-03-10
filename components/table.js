import { Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Progress, Grid } from "@nextui-org/react";

export default function TableGrid() {
  function progress() {
    return (
      <Grid.Container xs={12}>
        <Grid>
          <Progress
            indeterminated
            value={50}
            color="secondary"
            status="secondary"
          />
        </Grid>
      </Grid.Container>
    );
  }
  const [dataInf, setDataInf] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_SERVER + "/infos"
      );
      if (data) {
        setDataInf(data.infos);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const TableRow = () => {
    return dataInf.map((item, index) => (
      <Table.Row key={index}>
        <Table.Cell>{item.Policy_id}</Table.Cell>
        <Table.Cell>{item.Customer_Gender}</Table.Cell>
        <Table.Cell>{item.Customer_Region}</Table.Cell>
        <Table.Cell>{item.Fuel}</Table.Cell>
      </Table.Row>
    ));
  };

  return (
    <>
      {!loading ? (
        <Table
          aria-label="Example static collection table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="single"
        >
          <Table.Header>
            <Table.Column>NAME</Table.Column>
            <Table.Column>ROLE</Table.Column>
            <Table.Column>STATUS</Table.Column>
            <Table.Column>RATE</Table.Column>
          </Table.Header>
          <Table.Body>{TableRow()}</Table.Body>
        </Table>
      ) : (
        progress()
      )}
    </>
  );
}
