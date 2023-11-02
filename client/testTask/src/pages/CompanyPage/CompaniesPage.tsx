import { useEffect, useState } from "react";
import { getAllCompanies, deleteCompany } from "../../api/companies.api";
import styles from "./company.module.css";
import { CompanyItem, AddCompanyModal } from "../../components/index";
import { PlusCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { CompaniesOutput } from "../../api/types";

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<CompaniesOutput>();
  const [showModal, setShowModal] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsModalClosed(true);
  };

  const fetchData = async () => {
    try {
      const response = await getAllCompanies();
      setCompanies(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isModalClosed) {
      fetchData();
      setIsModalClosed(false);
    }
  }, [isModalClosed]);
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (itemId: number) => {
    await deleteCompany({ companyId: itemId });
    fetchData();
  };

  const handleNavigate = async (itemId: number) => {
    navigate(`/main/${itemId}`);
  };
  return (
    <>
      <div className={styles.headerCompany}>Manage Companies</div>
      <div className={styles.container}>
        {companies &&
          companies.map((company) => (
            <CompanyItem
              key={company.id}
              company={company}
              onDelete={handleDelete}
              onClick={handleNavigate}
            />
          ))}
        <button className={styles.addButton} onClick={handleOpenModal}>
          <PlusCircle className={styles.icon} />
        </button>
        <AddCompanyModal showModal={showModal} handleClose={handleCloseModal} />
      </div>
    </>
  );
};

export default CompaniesPage;
