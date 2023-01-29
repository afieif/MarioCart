import React from "react";
import Warehouse from "../Warehouse/Warehouse.js";
import Sales from "../Sales/Sales.js";
import Admin from "../Admin/Admin.js";
import Role from "../Role/Role.js";
import Analyst from "../Analyst/Analyst.js";

export default function RoleHandler({ role }) {
  return (
    <div>
      {role === "SIGNUP" && <Role />}
      {role === "Warehouse" && <Warehouse />}
      {role === "Sales" && <Sales />}
      {role === "Admin" && <Admin />}
      {role === "Analyst" && <Analyst />}
    </div>
  );
}
