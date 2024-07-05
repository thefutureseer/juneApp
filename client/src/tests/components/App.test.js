import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../setupTests';
import App from '../../App';
import Navbar from '../../components/layout/Navbar';
// Import MemoryRouter to wrap your tests with Router context
import { MemoryRouter } from 'react-router-dom'; 


//Tests for rendering the Navbar component 
test('renders Navbar component', () => {
  render(<Navbar />);
  // Using getByRole to find the link with 
  //the accessible name matching "ss" (case-insensitive)
  const linkElement = screen.getByRole('link', { name: /SS/i });
  expect(linkElement).toBeInTheDocument();
});

test('renders Navbar component', () => {
  render(<App />);
  
  // Check if the Navbar brand link ("SS") is present
  const brandElement = screen.getByTestId('brand-link');
  
  expect(brandElement).toBeInTheDocument();

});


// test('renders Navbar component and checks for links', () => {
//   render(<App />, 
//   {
//     initialState: {
//       auth: {
//         isAuthenticated: false, // Set to true to test authenticated links
//         loading: false,
//       },
//     },
//   });


// });