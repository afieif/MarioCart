import React from "react";
import coin from "../../assets/coin.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import deleteIcon from "../../assets/delete.png";
import editIcon from "../../assets/Edit.png";

const rows = [
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
];

function Admin() {
	return (
		<>
			<div>
				<div className="container">
					<h1>Welcome back Admin</h1>
					<div className="card-container">
						<div className="vellumptuous">
						<div className="card">
							<h1 className="card-header">Total Items</h1>
							<div className="flex">
								<img src={coin} alt="" />
								<p>120</p>
							</div>
						</div>
						</div>
						<div className="card">
							<h1 className="card-header">Total Items</h1>
							<div className="flex">
								<img src={coin} alt="" />
								<p>120</p>
							</div>
						</div>
						<div className="card">
							<h1 className="card-header">Total Items</h1>
							<div className="flex">
								<img src={coin} alt="" />
								<p>120</p>
							</div>
						</div>
					</div>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Product Name</TableCell>
									<TableCell align="right">MRP</TableCell>
									<TableCell align="right">
										Product ID
									</TableCell>
									<TableCell align="right">
										Supplier
									</TableCell>
									<TableCell align="right">Action</TableCell>
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
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">
											{row.mrp}
										</TableCell>
										<TableCell align="right">
											{row.sid}
										</TableCell>
										<TableCell align="right">
											{row.supplier}
										</TableCell>
										<TableCell align="right">
											<img src={editIcon} alt="" />
											<img src={deleteIcon} alt="" />
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

export default Admin;
