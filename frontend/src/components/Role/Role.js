import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../context/AuthContext";
import { assignRole } from "./roleService";
import Warehouse from "../Warehouse/Warehouse.js";
import Sales from "../Sales/Sales.js";
import Admin from "../Admin/Admin.js";
import Analyst from "../Analyst/Analyst";

export default function Role({ role }) {
  const { user, setRole } = useAuth();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const [name, setName] = useState("");
  const [roleSelect, setRoleSelect] = useState("Sales");
  return (
    <div>
      {role === "SIGNUP" ? (
        <Box sx={style}>
          <div className="modal-title">Enter Details</div>
          <div className="flex-row">
            <div>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </div>
            <div>
              <Select
                label="role"
                value={roleSelect}
                onChange={(e) => setRoleSelect(e.target.value)}
              >
                <MenuItem value={"Sales"}>Sales</MenuItem>
                <MenuItem value={"Warehouse"}>Warehouse</MenuItem>
                <MenuItem value={"Analyst"}>Analyst</MenuItem>
              </Select>
            </div>
          </div>
          <div className="flex-row">
            <div>
              <Button
                variant="contained"
                onClick={() =>
                  assignRole(
                    { name: name, uid: user.uid, role: roleSelect },
                    setRole
                  )
                }
              >
                Submit
              </Button>
            </div>
          </div>
        </Box>
      ) : (
        <>
          {role === "Warehouse" && <Warehouse />}
          {role === "Sales" && <Sales />}
          {role === "Admin" && <Admin />}
          {role === "Analyst" && <Analyst />}
        </>
      )}
    </div>
  );
}
