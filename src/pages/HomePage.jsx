import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db from '../firebase/firebaseConfig';

import { toast } from 'react-toastify';

import Layout from './_Layout';
import { InputField, Loader } from '../components';
import { probableDateDeath } from '../helpers';

const initialClient = {
  name: '',
  last_name: '',
  age: '',
  date_birth: '',
};

const HomePage = () => {
  const navigate = useNavigate();
  const [clientForm, setClientForm] = useState(initialClient);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setClientForm({ ...clientForm, [name]: value });
  };

  const requiredFields = Object.values(clientForm).every(
    (clientForm) => clientForm !== ''
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const docRef = await addDoc(collection(db, 'clients'), {
      ...clientForm,
      probableDateDeath: probableDateDeath(
        clientForm.age,
        clientForm.date_birth
      ).probableDate,
      timestamp: serverTimestamp(),
    });

    toast.success('¡Cliente Registrado!');

    setClientForm(initialClient);

    // console.log('docRef:', docRef.id);
    setLoading(false);
  };

  return (
    <Layout id="home">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-6">
            <form onSubmit={handleSubmit}>
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    {/* <pre>{JSON.stringify(clientForm, null, 2)}</pre> */}

                    <h1 className="title mt-0 has-text-centered">
                      Registrar cliente
                    </h1>

                    <InputField
                      label="Nombre"
                      name="name"
                      value={clientForm.name}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Apellidos"
                      name="last_name"
                      value={clientForm.last_name}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Edad"
                      type="number"
                      name="age"
                      value={clientForm.age}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Fecha de nacimiento"
                      type="date"
                      name="date_birth"
                      value={clientForm.date_birth}
                      onChange={handleChange}
                    />

                    <div className="field is-grouped">
                      <div className="control">
                        <button
                          className="button is-link"
                          type="submit"
                          disabled={loading || !requiredFields}
                        >
                          {loading ? (
                            <Loader small color="white" />
                          ) : (
                            'Registrar cliente'
                          )}
                        </button>
                      </div>

                      <div className="control">
                        <button
                          type="button"
                          className="button is-primary is-light"
                          onClick={() => navigate('/listar-clientes')}
                        >
                          Ver clientes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
