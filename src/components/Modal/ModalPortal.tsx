import React, { useMemo } from 'react';

import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const el = useMemo(() => document.getElementById('modal'), []);

  if (!el) return null;
  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
