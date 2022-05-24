import React, { useState } from 'react';

import Layout from './_Layout';

// const initialForm = {
//   name: '',
//   last_name: '',
//   age: '',
// };

const HomePage = () => {
  const [clientForm, setClientForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log('name:', name);
    console.log('value:', value);

    setClientForm({ ...clientForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('send');
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
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <label className="checkbox">
                          <input
                            type="checkbox"
                            name="terms"
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
                    </div>

                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link" type="button">
                          Crear cliente
                        </button>
                      </div>

                      {/* <div className="control">
                  <button className="button is-link is-light">Cancel</button>
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
