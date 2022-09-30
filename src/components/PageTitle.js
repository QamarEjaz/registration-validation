import { config } from '../utils/config';

const PageTitle = ({ title, children }) => {
  return (
    <div className='page-title'>
      <h1 className={`${config.app.textColor} `}>{title}</h1>
      <p className='text-sm md:text-lg mt-1 md:mt-3 text-mobile-grey-600'>
        {children}
      </p>
    </div>
  );
};

export default PageTitle;
