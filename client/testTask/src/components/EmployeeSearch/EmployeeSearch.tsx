import React, { useState, ChangeEvent } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

interface EmployeeSearchProps {
  handleSearch: (searchTerm: string) => void;
}

const EmployeeSearch: React.FC<EmployeeSearchProps> = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <Form style={{marginTop: '15px'}}>
      <FormControl
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleChange}
      />
    </Form>
  );
};

export default EmployeeSearch;
