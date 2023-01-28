import { React, useState } from "react";
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
/* import { TablePagination } from '@mui/material'; */

const rows = [
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
];

function Admin() {
	/* 	const pages = [5,10,15]
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
	const TblPagination = () => (<TablePagination
		component="div"
		page={page}
		rowsPerPageOptions={pages}
		rowsPerPage={rowsPerPage}
		onPageChange
		/>) */
	return (
		<>
			<div>
				<div className="container">
					<p className="admin-header">Welcome Back Admin</p>
					<div className="card-container">
						<div className="vellumptuous">
							<div className="card">
								<h1 className="card-header">Total Items</h1>
								<div className="flex">
									<img src={coin} alt="" />
									<p className="card-stats">120</p>
								</div>
							</div>
						</div>
						<div className="card">
							<h1 className="card-header">Total Items</h1>
							<div className="flex">
								<img src={coin} alt="" />
								<p className="card-stats">120</p>
							</div>
						</div>
						<div className="card">
							<h1 className="card-header">Total Items</h1>
							<div className="flex">
								<img src={coin} alt="" />
								<p className="card-stats">120</p>
							</div>
						</div>
					</div>
					<TableContainer component={Paper}>
<<<<<<< Updated upstream
						<Table sx={{ minWidth: 650 }}  aria-label="simple table" >
							<TableHead >
								<TableRow >
									<TableCell className="table-header">Product Name</TableCell>
									<TableCell align="right" className="table-header">MRP</TableCell>
									<TableCell align="right" className="table-header">
=======
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Product Name</TableCell>
									<TableCell align="right">MRP</TableCell>
									<TableCell align="right">
>>>>>>> Stashed changes
										Product ID
									</TableCell>
									<TableCell align="right" className="table-header">
										Supplier
									</TableCell>
									<TableCell align="right" className="table-header">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.name}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
<<<<<<< Updated upstream
										}}
										
										>
										<TableCell component="th" scope="row" className="table-body">
=======
										}}>
										<TableCell component="th" scope="row">
>>>>>>> Stashed changes
											{row.name}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.mrp}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.sid}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.supplier}
										</TableCell>
										<TableCell align="right">
											<img
												src={editIcon}
												alt=""
												className="action-button"
											/>
											<img
												src={deleteIcon}
												alt=""
												className="action-button"
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
			{/* 			<TablePagination
	component="div"
	page={page}
	rowsPerPageOptions={pages}
	rowsPerPage={rowsPerPage}
	/> */}
		</>
	);
}

export default Admin;
