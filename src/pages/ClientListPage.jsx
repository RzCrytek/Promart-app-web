import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/firebaseConfig';

import Layout from './_Layout';
import { Loader, Modal, Table } from '../components';

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
      const querySnapshot = await getDocs(collection(db, 'clients'));

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

  console.log('docsCollection:', docsCollection);

  return (
    <Layout id="client-list">
      <div className="container">
        <h1 className="title">Lista de clientes</h1>

        {renderClientData(docsCollection, handleModal)}
      </div>

      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          <p>
            Cliente: {client.name} {client.last_name}
          </p>
          <p>Fecha estimada: DD/MM/AAAA</p>
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
