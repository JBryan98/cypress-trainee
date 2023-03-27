export const selectAllClients = () => {
  return "select * from clients";
};

export const deleteClient = (dni) => {
  return `delete from clients where dni = ${dni}`;
};

export const createClient = (
  firstName,
  lastName,
  dni,
  email,
  address,
  phone
) => {
    cy.log(firstName)
  return `insert into clients(first_name, last_name, dni, email, address, phone) values ('${firstName}', '${lastName}', ${dni}, '${email}', '${address}', ${phone})`;
};
