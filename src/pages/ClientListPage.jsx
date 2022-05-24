import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/firebaseConfig';

import Layout from './_Layout';
import Table from '../components/Table';
import Loader from '../components/Loader';

const initialState = {
  data: [],
  loader: true,
};

const ClientListPage = () => {
  const [docsCollection, setDocsCollection] = useState(initialState);

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

  console.log('docsCollection:', docsCollection);

  return (
    <Layout id="client-list">
      <div className="container">
        <h1 className="title">Lista de clientes</h1>

        {renderClientData(docsCollection)}
      </div>
    </Layout>
  );
};

const renderClientData = ({ loader, data }) => {
  console.log('data:', data);
  console.log('data:', data.length);
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

  if (data.length > 0) return <Table docsCollection={data} />;
};

export default ClientListPage;
