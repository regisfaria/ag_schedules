import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FiLayers,
  FiFileText,
  FiBookOpen,
  FiUserPlus,
  FiMenu,
  FiX,
  FiLogOut,
} from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { ShowMenu, Logout, SideMenuBox, MenuOption } from './styles';

const Menu: React.FC = () => {
  const [menuState, setMenuState] = useState(false);
  const [,] = useState(false);

  const history = useHistory();
  const { signOut } = useAuth();

  const handleMenuState = useCallback(() => {
    setMenuState(!menuState);
  }, [menuState]);

  const handleLogOut = useCallback(() => {
    signOut();

    history.push('/');
  }, [signOut, history]);

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

        <Logout>
          <button type="button" onClick={handleLogOut}>
            <FiLogOut size={40} />
          </button>
        </Logout>

        <MenuOption menuState={menuState}>
          <Link to="dashboard">
            <div>
              <FiLayers size={16} />
              <p>Dashboard</p>
            </div>
          </Link>

          <button type="button">
            <FiFileText size={16} />
            <p>Consultas</p>
            <div>
              <Link to="/consults">Criar Consulta</Link>
              <Link to="/consults/view">Ver Consultas</Link>
            </div>
          </button>

          <button type="button">
            <FiBookOpen size={16} />
            <p>Historico</p>
            <div>
              <Link to="/history/pacients">Pacientes Criados</Link>
              <Link to="/history/agents">Agentes Criados</Link>
              <Link to="/history/consults">Consultas Criadas</Link>
            </div>
          </button>

          <button type="button">
            <FiUserPlus size={16} />
            <p>Registrar</p>
            <div>
              <Link to="/register/pacients">Registrar Paciente</Link>
              <Link to="/register/agent">Registrar Agente</Link>
              <Link to="/register/specialist">Pacientes Especialista</Link>
            </div>
          </button>
        </MenuOption>
      </SideMenuBox>
    </>
  );
};

export default Menu;
