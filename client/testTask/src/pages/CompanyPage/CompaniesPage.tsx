import React, { useEffect, useState } from "react";
import styles from "./company.module.css";
import { CompanyItem, AddCompanyModal } from "../../components/index";
import { PlusCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { trpc } from "../../utils/trpcClient";
import { CompanyOutput } from "../../api/types";


const CompaniesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const companies  = trpc.company.allCompanies.useQuery();
  const mutation = trpc.company.deleteCompany.useMutation();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsModalClosed(true);
  };

  useEffect(() => {
    if (isModalClosed) {
      const refetchData = async () => {
        await companies.refetch();
      };
      refetchData();
      setIsModalClosed(false);
    }
  }, [isModalClosed]);

  const handleDelete = async (itemId: number) => {
    const deleteData = async () => {
      await mutation.mutateAsync({ companyId: itemId });
      companies.refetch();
    };
    deleteData();
  };

  const handleNavigate = async (itemId: number) => {
    navigate(`/main/${itemId}`);
  };

  return (
    <>
      <div className={styles.headerCompany}>Manage Companies</div>
      <div className={styles.container}>
        {companies.data &&
          companies.data.map((company : CompanyOutput) => (
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
