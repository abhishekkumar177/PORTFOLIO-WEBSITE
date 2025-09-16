import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ image, handle, status }) => {
  return (
    <div className="pc-card-wrapper">
      <div className="pc-card">
        <div className="pc-inside"></div>
        <div className="pc-shine"></div>
        <div className="pc-glare"></div>
        <div className="pc-avatar-content">
          <img className="avatar" src={image} alt="Profile Avatar" />
        </div>
        <div className="pc-user-info">
          <div className="pc-user-details">
            <div className="pc-mini-avatar">
              <img src={image} alt="Mini Avatar" />
            </div>
            <div className="pc-user-text">
              <span className="pc-handle">{handle}</span>
              <span className="pc-status">{status}</span>
            </div>
          </div>
          <button className="pc-contact-btn">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;