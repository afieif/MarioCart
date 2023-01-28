import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [
	{
		name: "Frozen yoghurt",
		qty: 159,
		supplier: "Fr. CRCE",
		total: 100,
		status: "Completed",
	},
	{
		name: "Frozen yoghurt",
		qty: 159,
		supplier: "Fr. CRCE",
		total: 100,
		status: "Completed",
	},
	{
		name: "Frozen yoghurt",
		qty: 159,
		supplier: "Fr. CRCE",
		total: 100,
		status: "Completed",
	},
	{
		name: "Frozen yoghurt",
		qty: 159,
		supplier: "Fr. CRCE",
		total: 100,
		status: "Completed",
	},
	{
		name: "Frozen yoghurt",
		qty: 159,
		supplier: "Fr. CRCE",
		total: 100,
		status: "Completed",
	},
	{
		name: "Frozen yoghurt",
		qty: 159,
		supplier: "Fr. CRCE",
		total: 100,
		status: "Completed",
	},
];

function Supplier() {
	return (
		<>
			<div>
				<div className="container">
					<p className="admin-header">Supplier Dashboard</p>
					<div className="card-container">
						{/* here the searchbars will go  */}
					</div>
					<p className="admin-header">Pending Requests</p>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell className="table-header">
										Product Name
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Qty
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Supplier
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Total
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Action
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.name}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}>
										<TableCell
											component="th"
											scope="row"
											className="table-body">
											{row.name}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.qty}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.supplier}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.total}
										</TableCell>
										<TableCell
											align="right"
											className="action-buttons">
											<button className="recieve-button">
												Dispatch
											</button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<p className="admin-header">Completed Shipments</p>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell className="table-header">
										Product Name
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Qty
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Supplier
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Total
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.name}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}>
										<TableCell
											component="th"
											scope="row"
											className="table-body">
											{row.name}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.qty}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.status}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.supplier}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</>
	);
}

export default Supplier;
