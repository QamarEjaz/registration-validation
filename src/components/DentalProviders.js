import React, { useContext, useEffect, useState } from 'react';

import { store } from '../store';
import * as actions from '../utils/actionTypes';
import { insuranceProviders } from '../utils/insuranceProviders';

export default function DentalProviders() {
  const { state, dispatch } = useContext(store);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    dispatch({
      type: actions.SET_INSURANCE,
      payload: {
        insurance: { ...state.insurance, dentalProvider: selectedOption },
      },
    });
  }, [selectedOption]);

  useEffect(() => {
    if (state.insurance.dentalProvider)
      setSelectedOption(state.insurance.dentalProvider);
  }, []);

  return (
    <div className='border-b-2 border-mobile-grey-200 text-mobile-grey-600 my-3 md:my-5'>
      <select
        id='dental-provider'
        name='dental_proivder'
        className='block w-full px-0 py-1 md:py-2 text-base border-0 ring-0 focus:outline-none focus:ring-0 '
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value=''>Select Insurance Provider</option>
        {insuranceProviders.map((op) => (
          <option value={op} key={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
