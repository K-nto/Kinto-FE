import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNodeList } from "../../store/nodes/nodes.selectors";
import "../common/Section.css";
import NewNodeCard from "./NodeCard/NewNodeCard";
import NodeCard from "./NodeCard/NodeCard";

// const nodes = [
//   {
//     alias: "Laptop",
//     id: "8c6d4e93-896b-4cc4-bba4-dd99d741b9d7",
//     type: "storage",
//     status: "online",
//     lastSync: 1658694567,
//     size: 100000000000,
//     used: 35000000000,
//     score: 0.93,
//   },
//   {
//     alias: "Desktop",
//     id: "8c6d4e93-896b-4cc4-bba4-dd99d741b9d9",
//     type: "storage",
//     status: "connecting",
//     lastSync: 1658694567,
//     size: 100000000000,
//     used: undefined,
//     score: undefined,
//   },
//   {
//     alias: "PC",
//     id: "8c6d4e93-896b-4cc4-bba4-dd99d741b9d8",
//     type: "storage",
//     status: "online",
//     lastSync: 1658694567,
//     size: 100000000000,
//     used: 35000000000,
//     score: 0.75,
//   },
//   {
//     alias: "Desktop",
//     id: "8c6d4e93-896b-4cc4-bba4-dd99d741b9d7",
//     type: "storage",
//     status: "disconnected",
//     lastSync: 1658694567,
//     size: 100000000000,
//     used: undefined,
//     score: undefined,
//   },
// ];

const Nodes = () => {
  const nodes = useSelector(selectNodeList);

  const dispatch = useDispatch();

  return (
    <div className="section">
      <h1>Mis nodos</h1>{" "}
      <div className="container">
        {nodes.map((node) => (
          <NodeCard key={node.id} data={node} />
        ))}
        <NewNodeCard />
      </div>
    </div>
  );
};

export default Nodes;
