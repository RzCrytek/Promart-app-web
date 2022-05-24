import React, { useEffect, useState } from 'react';

import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase/firebaseConfig';

import { toast } from 'react-toastify';

import Layout from './_Layout';
import { Link } from 'react-router-dom';

const initialClient = {
  name: '',
  last_name: '',
  age: '',
  date_birth: '',
};

const HomePage = () => {
  const [clientForm, setClientForm] = useState(initialClient);
  const [formErrors, setFormErrors] = useState(true);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      !clientForm.name ||
      !clientForm.last_name ||
      !clientForm.age ||
      !clientForm.date_birth
      // !clientForm.terms
    ) {
      setFormErrors(true);
    } else {
      setFormErrors(false);
    }
  }, [clientForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setClientForm({ ...clientForm, [name]: value });

    // if (name === 'terms') {
    //   setClientForm({ ...clientForm, [name]: e.target.checked });
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('sendd');
    console.log('clientForm:', clientForm);
    console.log('env:', process.env.REACT_APP_FIREBASE_AUTHDOMAIN);

    const docRef = await addDoc(collection(db, 'clients'), clientForm);

    toast.success('¡Cliente Registrado!');

    setClientForm(initialClient);

    console.log('docRef:', docRef.id);

    console.log('finish');
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
                    <pre>{JSON.stringify(clientForm, null, 2)}</pre>
                    <div className="field">
                      <label className="label">Nombre</label>

                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="name"
                          value={clientForm.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Apellidos</label>

                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="last_name"
                          value={clientForm.last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Edad</label>

                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          name="age"
                          value={clientForm.age}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Fecha de nacimiento</label>

                      <div className="control">
                        <input
                          className="input"
                          type="date"
                          name="date_birth"
                          value={clientForm.date_birth}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* <div className="field">
                      <div className="control">
                        <label className="checkbox">
                          <input
                            type="checkbox"
                            name="terms"
                            value="true"
                            onChange={handleChange}
                            required
                          />{' '}
                          Acepto los{' '}
                          <a
                            className="is-underlined"
                            href="#!"
                            target="_blank"
                            rel="noreferrer"
                          >
                            términos y condiciones
                          </a>
                        </label>
                      </div>
                    </div> */}

                    <div className="field is-grouped">
                      <div className="control">
                        <button
                          className="button is-link"
                          type="submit"
                          disabled={formErrors}
                        >
                          Crear cliente
                        </button>
                      </div>

                      {/* <div className="control">
                        <Link
                          className="button is-link is-light"
                          to="/listar-clientes"
                        >
                          Ver clientes
                        </Link>
                      </div> */}
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
