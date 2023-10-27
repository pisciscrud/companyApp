import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import styles from "./CompanyItem.module.css";
import { Trash } from "react-bootstrap-icons";


interface CompanyItemProps {
  company: {
    name: string;
    description: string;
    createdAt: string;
    id: number;
  };
}

const CompanyItem: React.FC<CompanyItemProps> = ({ company, onDelete, onClick }) => {
  const { name, description, createdAt, id } = company;

  const handleDelete = () => {
    onDelete(id);
  };
  const handleOpenCompany = async() =>
  { 
    onClick(id)

  }
  const formattedDate = new Date(createdAt).toLocaleString();
  return (
    <div className={styles.companyCard}>
      <h2>Name: {name}</h2>
      <p>Description: {description}</p>
      <p>Created at: {formattedDate}</p>
      <div>
        <button className={styles.deleteButton} onClick={handleOpenCompany}>Get all info</button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default CompanyItem;
