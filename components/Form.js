import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import Swal from 'sweetalert2';

const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const formData = {
      name: data.name,
      cognome: data.cognome,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
      privacy: data.privacy,
    };

    // Temporarily skip fetch and redirect to thank-you page
    // Uncomment the fetch block below when the endpoint is active
    window.location.href = '/thank-you';
    setIsSubmitting(false); // Reset submitting state after redirect
    return; // Exit the function to prevent further execution

    /*
    // Uncomment this block when the backend endpoint is active
    try {
      const response = await fetch('/Voice2Insight/SendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = 'thank-you'; // Redirect on success
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Errore nell\'invio!',
          text: result.message || 'Si è verificato un problema durante l\'invio della richiesta.',
          confirmButtonText: 'Ok',
        });
      }
    } catch (error) {
      console.error('Errore:', error);
      Swal.fire({
        icon: 'error',
        title: 'Errore!',
        text: 'Si è verificato un problema. Controlla la tua connessione e riprova.',
        confirmButtonText: 'Ok',
      });
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  return (
    <section id="form" className="section-padding-bottom">
      <div className="container">
        <div className="">
          <div className="card rounded-5">
            <div className="form__wrapper p-4">
              <h2 className="fw-bolder mb-4 color-text-primary">Prenota la tua demo gratuita!</h2>
              <form id="form-contatti" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div id="data">
                  <h5 className="mb-3 color-text-primary">Dove possiamo contattarti?</h5>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="fv-row">
                        <div className="form-floating">
                          <input
                            id="titleId"
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Nome"
                            {...register('name', { required: 'Il nome è obbligatorio' })}
                          />
                          <label htmlFor="titleId">Nome*</label>
                          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="fv-row mt-3 mt-md-0">
                        <div className="form-floating">
                          <input
                            id="surnameId"
                            type="text"
                            className={`form-control ${errors.cognome ? 'is-invalid' : ''}`}
                            placeholder="Cognome"
                            {...register('cognome', { required: 'Il cognome è obbligatorio' })}
                          />
                          <label htmlFor="surnameId">Cognome*</label>
                          {errors.cognome && <div className="invalid-feedback">{errors.cognome.message}</div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-12 col-md-6">
                      <div className="fv-row my-3 my-md-0">
                        <div className="form-floating">
                          <input
                            id="emailId"
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Email"
                            {...register('email', {
                              required: "L'email è obbligatoria",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "L'email non è valida",
                              },
                            })}
                          />
                          <label htmlFor="emailId">Email aziendale*</label>
                          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="fv-row my-3 my-md-0">
                        <div className="form-floating">
                          <Controller
                            name="phone"
                            control={control}
                            rules={{
                              required: 'Il numero di telefono è obbligatorio',
                              pattern: {
                                value: /^\+?[\d\s()-]{7,15}$/,
                                message: 'Formato numero di telefono non valido',
                              },
                            }}
                            render={({ field }) => (
                              <IMaskInput
                                {...field}
                                mask={/^[0-9\s+()-]*$/} // Original mask from IMask
                                id="phoneId"
                                type="tel"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                placeholder="Telefono"
                              />
                            )}
                          />
                          <label htmlFor="phoneId">Telefono*</label>
                          {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fv-row my-3">
                    <div className="form-floating">
                      <textarea
                        id="notesId"
                        className="form-control"
                        placeholder="Note (opzionale)"
                        style={{ height: '100px' }}
                        {...register('notes')}
                      ></textarea>
                      <label htmlFor="notesId">Note (opzionale)</label>
                    </div>
                  </div>
                  <h5 className="mb-3 color-text-primary">Consenso privacy</h5>
                  <div className="fv-row form-check form-check-privacy">
                    <input
                      className={`form-check-input ${errors.privacy ? 'is-invalid' : ''}`}
                      type="checkbox"
                      id="privacy"
                      {...register('privacy', { required: "Devi accettare l'informativa sulla privacy" })}
                    />
                    <label className="form-check-label" htmlFor="privacy">
                      Dichiaro di aver letto <a href="https://www.iubenda.com/privacy-policy/99163371" className="privacy-link">l'informativa sulla privacy</a> e acconsento al trattamento dei miei dati personali.
                    </label>
                    {errors.privacy && <div className="invalid-feedback">{errors.privacy.message}</div>}
                  </div>
                  <button type="submit" className="btn cta-btn mt-5" id="submit" disabled={isSubmitting}>
                    {isSubmitting && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    <span className="button-text">{isSubmitting ? 'Invio...' : 'Invia'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
