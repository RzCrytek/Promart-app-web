import React from 'react';

const Table = ({ docsCollection }) => {
  const handleInfo = (id) => {
    console.log('id:', id);
  };

  const averageAge =
    docsCollection.reduce((acc, curr) => +acc + Number(curr.age), 0) /
    docsCollection.length;

  const standardDeviation = (data) => {
    const media = averageAge;

    data = data.map((x) => (+x.age - media) ** 2);

    const suma = data.reduce((acc, curr) => +acc + Number(curr), 0);
    // const variance = suma / data.length;

    return Math.sqrt(suma / data.length);
  };

  return (
    <>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Fecha de nacimiento</th>
            <th>Opción</th>
          </tr>
        </thead>

        <tbody>
          {docsCollection.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>

              <td>{client.last_name}</td>
              <td>{client.age}</td>
              <td>{client.date_birth}</td>
              <td>
                <button
                  className="button is-info is-light"
                  onClick={() => handleInfo(client.id)}
                >
                  Ver proyección
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="table is-bordered is-striped is-narrow">
        <thead>
          <tr>
            <th>Promedio de edad</th>
            <th>Desviación estandar</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{averageAge}</td>
            <td>{standardDeviation(docsCollection)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
