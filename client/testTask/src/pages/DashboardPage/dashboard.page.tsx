import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const DashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
 
  return (
    <>
      <p>{id}</p>
    </>
  );
};

export default DashboardPage;
