import React from 'react';
import { FaIdBadge, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function ClientInfo({ client }) {
  return (
    <>
      <h5>Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge /> {client.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope /> {client.email}
        </li>
        <li className="list-group-item">
          <FaPhone /> {client.phone}
        </li>
      </ul>
    </>
  );
}
