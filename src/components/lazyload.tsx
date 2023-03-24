import { Skeleton, Spin } from '@arco-design/web-react';
import loadable from '@loadable/component';
import React from 'react';

// https://github.com/gregberge/loadable-components/pull/226
function load(fn: any, options: any) {
  const Component = loadable(fn, options);

  Component.preload = fn?.requireAsync || fn;

  return Component;
}

function LoadingComponent(props: {
  error: boolean;
  timedOut: boolean;
  pastDelay: boolean;
}) {
  if (props.error) {
    console.error(props.error);
    return null;
  }
  return (
    <div>
      <Spin />
    </div>
  );
}

export default (loader: any) => {
  return load(loader, {
    fallback: LoadingComponent({
      pastDelay: true,
      error: false,
      timedOut: false,
    }),
  });
};
