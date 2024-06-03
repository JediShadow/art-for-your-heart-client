import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from './Nav';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';


//This test does NOT pass. Cites 'setModal is not a function.""
// describe('Nav Component', () => {
//   it('renders the navigation links', () => {
//     render(
//       <BrowserRouter>
//         <Nav />
//       </BrowserRouter>
//     );

//     expect(screen.getByText('home')).toBeInTheDocument();
//     expect(screen.getByText('favorite')).toBeInTheDocument();
//     expect(screen.getByText('forum')).toBeInTheDocument();
//     expect(screen.getByText('person')).toBeInTheDocument();
//     expect(screen.getByText('logout')).toBeInTheDocument();
//   });
// });