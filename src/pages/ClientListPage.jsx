import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import db from '../firebase/firebaseConfig';

import Layout from './_Layout';
import { Loader, Modal, Table } from '../components';
import { probableDateDeath } from '../helpers';

const initialState = {
  data: [],
  loader: true,
};

const ClientListPage = () => {
  const [docsCollection, setDocsCollection] = useState(initialState);
  const [client, setClient] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getDocsCollection = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'clients'), orderBy('timestamp', 'desc'))
      );

      const arrQuerySnapshot = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setDocsCollection({ data: arrQuerySnapshot, loader: false });
    };

    getDocsCollection();
  }, []);

  const handleModal = (client) => {
    setClient(client);
    setOpenModal(!openModal);
  };

  return (
    <Layout id="client-list">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title">Lista de clientes</h1>
          </div>

          <div className="level-right">
            <Link className="button is-link is-light" to="/">
              Registrar cliente
            </Link>
          </div>
        </div>

        {renderClientData(docsCollection, handleModal)}
      </div>

      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          <h3 className="title is-size-5 has-text-centered">
            Fecha probable de defunción
          </h3>

          <table className="table is-fullwidth is-bordered">
            <tbody>
              <tr>
                <td>Cliente:</td>
                <td>
                  <strong>
                    {client.name} {client.last_name}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Fecha probable de defunción:</td>
                <td>
                  <strong>
                    {client.probableDateDeath.split('-').reverse().join('-')}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Aproximadamente en:</td>
                <td>
                  <strong>
                    {
                      probableDateDeath(client.age, client.date_birth)
                        .probableAge
                    }{' '}
                    años
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </Modal>
      )}
    </Layout>
  );
};

const renderClientData = ({ loader, data }, handleModal) => {
  if (loader) return <Loader />;

  if (data.length === 0)
    return (
      <div className="box has-text-centered">
        <h2 className="title is-5">No hay clientes.</h2>

        <Link className="button is-primary" to="/">
          Registrar cliente
        </Link>
      </div>
    );

  if (data.length > 0)
    return <Table docsCollection={data} handleModal={handleModal} />;
};

export default ClientListPage;
