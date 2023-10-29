import styles from "./CompanyItem.module.css";
import { Trash } from "react-bootstrap-icons";
import { Company } from "../../shared/interfaces/company";

interface CompanyItemProps {
  company: Company;
  onDelete: (id:number) => void;
  onClick: (id:number) => void;
}

const CompanyItem: React.FC<CompanyItemProps> = ({
  company,
  onDelete,
  onClick,
}) => {
  const { name, description, createdAt, id } = company;

  const handleDelete = () => {
    if(!id) return;
    onDelete(id);
  };
  const handleOpenCompany = async () => {
    if(!id) return;
    onClick(id);
  };
  const formattedDate = new Date(createdAt).toLocaleString();
  return (
    <div className={styles.companyCard}>
      <h2>Name: {name}</h2>
      <p>Description: {description}</p>
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
