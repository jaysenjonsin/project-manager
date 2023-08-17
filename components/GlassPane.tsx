import React from 'react';
import clsx from 'clsx';

type Props = {};

const GlassPane = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'glass rounded-2xl border-solid border-2 border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
