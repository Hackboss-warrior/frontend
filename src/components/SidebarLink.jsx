import React from 'react';

const SidebarLink = ({ name, floating, isActive, onClick, icon }) => {
    return (
      <a className={`sidebar__link ${isActive ? 'active-link' : ''}`} onClick={onClick}>
        {icon && <span>{icon}</span>}
        <span>{name}</span>
      </a>
    );
  };

export default SidebarLink;
