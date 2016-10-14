import { compose } from 'react-komposer';

export default function composeStub(fn, L, E, options) {
  const onPropsChange = (props, onData, context) => {
    const stub = fn(props, context);

    onData(null, stub);
  };

  return compose(onPropsChange, L, E, options);
}
