import React, { useContext, useEffect, useState } from 'react';

import { store } from '../store';
import { config } from '../utils/config';
import { notify } from '../utils/helpers';
import { useQuery } from '../utils/hooks';

import BackButton from './BackButton';
import Button from './Button';
import Loader from './Loader';
import StickyContainer from './StickyContainer';

const Square = ({ paymentForm, saveCard }) => {
  const { state } = useContext(store);
  let query = useQuery();

  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    paymentForm = new paymentForm({
      // Initialize the payment form elements

      //TODO: Replace with your sandbox application ID
      applicationId: config.square.appId,
      inputClass: 'sq-input',
      autoBuild: false,
      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [
        {
          fontSize: '14px',
          // lineHeight: "30px",
          padding: '12px',
          placeholderColor: '#a0a0a0',
          backgroundColor: 'white',
        },
      ],
      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'Card Number',
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV',
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY',
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Postal',
      },
      // SqPaymentForm callback functions
      callbacks: {
        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
        cardNonceResponseReceived: function (errors, nonce, cardData) {
          setErrors(null);

          if (errors) {
            setIsLoading(false);
            setIsDisabled(false);
            setErrors(errors);
            return;
          }

          console.log('nonce: ', nonce);
          console.log('cardData: ', cardData);
          saveCard(nonce, cardData);
        },
      },
    });

    paymentForm.build();
  });

  const requestCardNonce = () => {
    setIsDisabled(true);
    setIsLoading(true);

    try {
      paymentForm.requestCardNonce();
    } catch (error) {
      console.log(error);
      notify('Error! please refresh the page.', 'error');
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  return (
    <>
      <p className='text-mobile-grey-600 text-sm'>
        We require a credit card but, don’t worry: you won’t be charged until
        after your appointment.
      </p>

      <div
        id='form-container'
        className='bg-mobile-grey-50 my-4 p-4 pb-2 rounded-lg'
      >
        <div id='sq-card-number'></div>
        <div className='third' id='sq-expiration-date'></div>
        <div className='third' id='sq-cvv'></div>
        <div className='third' id='sq-postal-code'></div>
        <input
          className='mb-6'
          id='card-email'
          value={state.patient?.emailAddress}
          type='hidden'
        ></input>

        {isLoading && <Loader />}

        {errors && (
          <>
            <h4 className='text-mobile-red-1000 font-bold my-3'>Errors</h4>
            <ul className='text-mobile-red-1000 list-decimal pl-5'>
              {errors.map((error) => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <StickyContainer>
        <BackButton />

        <Button
          loading={isLoading}
          disabled={isDisabled}
          onClick={requestCardNonce}
          title={query.get(config.cardCheck) ? 'Add Card' : 'Book appointment'}
        />
      </StickyContainer>
    </>
  );
};

export default Square;
