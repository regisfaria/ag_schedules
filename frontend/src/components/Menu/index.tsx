import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FiLayers,
  FiFilePlus,
  FiBookOpen,
  FiMenu,
  FiX,
  FiLogOut,
} from 'react-icons/fi';
import { FaUserMd, FaUserTie, FaUserPlus } from 'react-icons/fa';
import { RiContactsBook2Line } from 'react-icons/ri';
import { AiOutlineFileSearch } from 'react-icons/ai';

import { useAuth } from '../../hooks/auth';

import {
  ShowMenu,
  CloseMenu,
  Logout,
  SideMenuBox,
  MenuOption,
  DropdownButton,
  LinkContainer,
  AgentLockedLinkContainer,
  SpecialistLockedLinkContainer,
  AdminOnlyLinkContainer,
  DownArrow,
  UpArrow,
} from './styles';

const Menu: React.FC = () => {
  const [menuState, setMenuState] = useState(false);
  const [consultsButtonState, setConsultsButtonState] = useState(false);
  const [historyButtonState, setHistoryButtonState] = useState(false);
  const [registerButtonState, setRegisterButtonState] = useState(false);
  const [userData, setUserData] = useState<string>();

  const history = useHistory();
  const { signOut, getUserRole } = useAuth();

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

  useEffect(() => {
    setUserData(getUserRole());
  }, [getUserRole]);

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
          <Link to="/dashboard">
            <div>
              <FiLayers size={16} />
              <p>Dashboard</p>
            </div>
          </Link>

          <DropdownButton menuState={menuState} open={consultsButtonState}>
            <button type="button" onClick={handleConsultsButton}>
              <p>
                Consultas
                <DownArrow size={20} open={consultsButtonState} />
                <UpArrow size={20} open={consultsButtonState} />
              </p>
              <div>
                <SpecialistLockedLinkContainer role={userData as string}>
                  <Link to="/consults/new">
                    <FiFilePlus />
                    Criar Consultas
                  </Link>
                </SpecialistLockedLinkContainer>

                <LinkContainer>
                  <Link to="/consults">
                    <AiOutlineFileSearch />
                    Ver Consultas
                  </Link>
                </LinkContainer>
              </div>
            </button>
          </DropdownButton>

          <DropdownButton menuState={menuState} open={historyButtonState}>
            <button type="button" onClick={handleHistoryButton}>
              <p>
                Historico
                <DownArrow size={20} open={historyButtonState} />
                <UpArrow size={20} open={historyButtonState} />
              </p>

              <div>
                <LinkContainer>
                  <Link to="/history/pacients">
                    <RiContactsBook2Line />
                    Pacientes Criados
                  </Link>
                </LinkContainer>

                <AgentLockedLinkContainer role={userData as string}>
                  <Link to="/history/agents">
                    <RiContactsBook2Line />
                    Agentes Criados
                  </Link>
                </AgentLockedLinkContainer>

                <AdminOnlyLinkContainer role={userData as string}>
                  <Link to="/history/agents">
                    <RiContactsBook2Line />
                    Especialistas Criados
                  </Link>
                </AdminOnlyLinkContainer>

                <LinkContainer>
                  <Link to="/history/consults">
                    <FiBookOpen />
                    Consultas Criadas
                  </Link>
                </LinkContainer>
              </div>
            </button>
          </DropdownButton>

          <DropdownButton menuState={menuState} open={registerButtonState}>
            <button type="button" onClick={handleRegisterButton}>
              <p>
                Registrar
                <DownArrow size={20} open={registerButtonState} />
                <UpArrow size={20} open={registerButtonState} />
              </p>

              <div>
                <LinkContainer>
                  <Link to="/register/pacient">
                    <FaUserPlus /> Registrar Paciente
                  </Link>
                </LinkContainer>

                <AgentLockedLinkContainer role={userData as string}>
                  <Link to="/register/agent">
                    <FaUserTie /> Registrar Agente
                  </Link>
                </AgentLockedLinkContainer>

                <AdminOnlyLinkContainer role={userData as string}>
                  <Link to="/register/specialist">
                    <FaUserMd /> Registrar Especialista
                  </Link>
                </AdminOnlyLinkContainer>
              </div>
            </button>
          </DropdownButton>
        </MenuOption>
      </SideMenuBox>
    </>
  );
};

export default Menu;
