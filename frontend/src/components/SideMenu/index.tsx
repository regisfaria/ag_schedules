import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FiLayers,
  FiFileText,
  FiBookOpen,
  FiUserPlus,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useTransition } from 'react-spring';

import { ShowMenu, SideMenuBox, MenuOption } from './styles';

const SideMenu: React.FC = () => {
  const [menuState, setMenuState] = useState(false);

  const handleMenuState = useCallback(() => {
    setMenuState(!menuState);
  }, [menuState]);

  return (
    <>
      <ShowMenu>
        <button type="button" onClick={handleMenuState}>
          <FiMenu size={40} />
        </button>
      </ShowMenu>

      <SideMenuBox menuState={menuState}>
        <button type="button">
          <FiX size={40} onClick={handleMenuState} />
        </button>

        <MenuOption menuState={menuState}>
          <Link to="/leads">
            <div>
              <FiLayers size={16} />
              <p>Dashboard</p>
            </div>
          </Link>

          <Link to="/tasks">
            <div>
              <FiFileText size={16} />
              <p>Consultas</p>
            </div>
          </Link>

          <Link to="/history">
            <div>
              <FiBookOpen size={16} />
              <p>Historico</p>
            </div>
          </Link>

          <Link to="/register">
            <div>
              <FiUserPlus size={16} />
              <p>Registrar</p>
            </div>
          </Link>
        </MenuOption>
      </SideMenuBox>
    </>
  );
};

export default SideMenu;
