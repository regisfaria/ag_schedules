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

import {
  ShowMenu,
  CloseMenu,
  Logout,
  SideMenuBox,
  MenuOption,
  DropdownButton,
} from './styles';

const Menu: React.FC = () => {
  const [menuState, setMenuState] = useState(false);
  const [consultsButtonState, setConsultsButtonState] = useState(false);
  const [historyButtonState, setHistoryButtonState] = useState(false);
  const [registerButtonState, setRegisterButtonState] = useState(false);

  const history = useHistory();
  const { signOut } = useAuth();

  const handleMenuState = useCallback(() => {
    setMenuState(!menuState);
  }, [menuState]);

  const handleLogOut = useCallback(() => {
    signOut();

    history.push('/');
  }, [signOut, history]);

  const handleConsultsButton = useCallback(() => {
    setConsultsButtonState(!consultsButtonState);
  }, [consultsButtonState]);

  const handleHistoryButton = useCallback(() => {
    setHistoryButtonState(!historyButtonState);
  }, [historyButtonState]);

  const handleRegisterButton = useCallback(() => {
    setRegisterButtonState(!registerButtonState);
  }, [registerButtonState]);

  return (
    <>
      <ShowMenu>
        <button type="button" onClick={handleMenuState}>
          <FiMenu size={40} />
        </button>
      </ShowMenu>

      <SideMenuBox menuState={menuState}>
        <CloseMenu>
          <button type="button" onClick={handleMenuState}>
            <FiX size={40} />
          </button>
        </CloseMenu>

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

          <DropdownButton menuState={menuState} open={consultsButtonState}>
            <button type="button" onClick={handleConsultsButton}>
              <p>
                <FiFileText size={16} />
                Consultas
              </p>
              <div>
                <Link to="/consults">Ver Consultas</Link>
                <Link to="/consults/new">Criar Consulta</Link>
              </div>
            </button>
          </DropdownButton>

          <DropdownButton menuState={menuState} open={historyButtonState}>
            <button type="button" onClick={handleHistoryButton}>
              <p>
                <FiBookOpen size={16} />
                Historico
              </p>
              <div>
                <Link to="/history/pacients">Pacientes Criados</Link>
                <Link to="/history/agents">Agentes Criados</Link>
                <Link to="/history/consults">Consultas Criadas</Link>
              </div>
            </button>
          </DropdownButton>

          <DropdownButton menuState={menuState} open={registerButtonState}>
            <button type="button" onClick={handleRegisterButton}>
              <p>
                <FiUserPlus size={16} />
                Registrar
              </p>
              <div>
                <Link to="/register/pacients">Registrar Paciente</Link>
                <Link to="/register/agent">Registrar Agente</Link>
                <Link to="/register/specialist">Pacientes Especialista</Link>
              </div>
            </button>
          </DropdownButton>
        </MenuOption>
      </SideMenuBox>
    </>
  );
};

export default Menu;
