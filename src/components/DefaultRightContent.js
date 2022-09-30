import { useContext } from 'react';
import PropTypes from 'prop-types';

import { store } from '../store';

import { config } from '../utils/config';
import { formatDate } from '../utils/helpers';
import { useQuery } from '../utils/hooks';

export default function DefaultRightContent(props) {
  const { showAppointmentDetails } = props;
  const { state } = useContext(store);
  let query = useQuery();

  return (
    <div
      className='hidden h-2/5 sm:h-1/2 md:h-full md:w-1/2 md:flex md:items-end md:mt-0'
      style={{
        backgroundImage: `url(${config.app.rightImageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      {showAppointmentDetails && !query.get(config.cardCheck) && (
        <>
          <div
            className='w-full p-10 xl:px-16 xl:py-10 slide-in-bottom'
            style={{
              backgroundColor: 'rgba(0, 0, 0, .05)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <h2
              className={`w-2/3 py-2 border-b-2 ${config.app.borderColor} ${config.app.reserveTextColor} text-2xl lg:text-3xl`}
            >
              Your visit details
            </h2>
            <br />
            <div className='flex items-center py-3 rounded-lg'>
              <div
                className={`flex flex-col items-center justify-center w-16 h-16 mr-3 ${config.app.backgroundColor} text-white rounded-lg`}
              >
                <span className='text-xl'>
                  {formatDate(state.slot.date, 'DD')}
                </span>
                <span className='text-xs'>
                  {formatDate(state.slot.date, 'MMMM')}
                </span>
              </div>
              <div className='flex flex-col'>
                <span className={`text-xl mb-2 ${config.app.reserveTextColor}`}>
                  {state.selectedLocation?.name}
                </span>
                <span className={`text-sm ${config.app.reserveTextColor}`}>
                  {formatDate(state.slot.date, 'dddd, MMMM DD, YYYY')} at{' '}
                  {formatDate(state.slot.start, 'hh:mm a', 'hh:mm')}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

DefaultRightContent.propTypes = {
  showAppointmentDetails: PropTypes.bool,
};
