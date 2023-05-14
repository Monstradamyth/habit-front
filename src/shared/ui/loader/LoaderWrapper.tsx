import React from 'react';

import { Loader, LoaderProps } from '@/shared/ui/loader/Loader';

type LoaderWrapperProps = LoaderProps & {
  loading: boolean;
  children?: React.ReactNode;
};

export const LoaderWrapper: React.FC<LoaderWrapperProps> = ({
  loading,
  children,
  ...props
}) => {
  if (loading) {
    return <Loader {...props} />;
  }

  return <>{children}</>;
};
