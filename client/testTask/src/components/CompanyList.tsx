import React, { useState } from "react";
import { trpc } from "../utils/trpcClient";

export const CompanyList: React.FC = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      trpc.company.addCompany.mutate({ name: name, description: description });
      event.preventDefault();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Description: </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
};
