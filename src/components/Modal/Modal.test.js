import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';

describe('Modal Component', () => {
  it('renders the modal correctly', () => {
    const modalPerson = {
      stringId: '1',
      realPhoto: 'path-to-image.jpg',
      name: 'John Doe',
      bio: 'Lorem ipsum',
      gender: 'Male',
      height: '180cm',
      interests: 'Coding, Reading',
    };
    const messageCount = { '1': 3 };
    const closeModal = jest.fn();
    render(
      <Modal
        closeModal={closeModal}
        modalPerson={modalPerson}
        messageCount={messageCount}
      />
    );
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Bio: Lorem ipsum')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Height: 180cm')).toBeInTheDocument();
    expect(screen.getByText('Interests: Coding, Reading')).toBeInTheDocument();
  });
});