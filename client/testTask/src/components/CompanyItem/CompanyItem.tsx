import styles from "./CompanyItem.module.css";
import { Trash } from "react-bootstrap-icons";
import { CompanyOutput } from "../../api/types";

interface CompanyItemProps {
  company: CompanyOutput;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
}

const CompanyItem: React.FC<CompanyItemProps> = ({
  company,
  onDelete,
  onClick,
}) => {
  const handleDelete = () => {
    if (!company.id) return;
    onDelete(company.id);
  };
  const handleOpenCompany = async () => {
    if (!company.id) return;
    onClick(company.id);
  };
  const formattedDate = new Date(company.createdAt!).toLocaleString();
  return (
    <div className={styles.companyCard}>
      <h2>Name: {company.name}</h2>
      <p>Description: {company.description}</p>
      <p>Created at: {formattedDate}</p>
      <div>
        <button className={styles.deleteButton} onClick={handleOpenCompany}>
          Get all info
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default CompanyItem;
