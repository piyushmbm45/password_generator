import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import App from './App.jsx';

test('renders content', () => {
  const component = render(<App></App>);
  console.log(component);
});
