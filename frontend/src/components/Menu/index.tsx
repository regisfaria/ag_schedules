import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FiLayers,
  FiPlus,
  FiList,
  FiEdit,
  FiWatch,
  FiBookOpen,
  FiMenu,
  FiX,
  FiLogOut,
  FiFileText,
} from 'react-icons/fi';
import { FaRegAddressCard, FaUserTie, FaUserMd } from 'react-icons/fa';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import {
  ShowMenu,
  CloseMenu,
  Logout,
  SideMenuBoxContainer,
  SideMenuButtons,
  SideMenuBox,
  MenuOption,
  ProfileLinkContainer,
  OptionLinkContainer,
  AdminLockedOption,
  SpecialistOnlyOption,
  SupervisorOnlyOption,
  AdminOnlyOption,
  SpecialistLockedSection,
  AdminLockedSection,
} from './styles';

interface UserProfile {
  imageUrl: string;
}

const Menu: React.FC = () => {
  const [menuState, setMenuState] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile>(
    {} as UserProfile,
  );

  const history = useHistory();
  const { signOut, user } = useAuth();

  const handleMenuState = useCallback(() => {
    setMenuState(!menuState);
  }, [menuState]);

  const handleLogOut = useCallback(() => {
    signOut();

    history.push('/');
  }, [signOut, history]);

  useEffect(() => {
    if (!user.id && user.type !== 'admin') {
      return;
    }
    if (user.type === 'supervisor') {
      api.get(`/profiles/supervisor/${user.id}`).then(response => {
        setCurrentUserProfile(response.data);
      });
    } else {
      api.get(`/profiles/specialist/${user.id}`).then(response => {
        setCurrentUserProfile(response.data);
      });
    }
  }, [user]);

  return (
    <>
      <ShowMenu>
        <button type="button" onClick={handleMenuState}>
          <FiMenu size={40} />
        </button>
      </ShowMenu>

      <SideMenuBoxContainer menuState={menuState}>
        <SideMenuBox menuState={menuState}>
          <SideMenuButtons menuState={menuState}>
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
          </SideMenuButtons>

          <MenuOption menuState={menuState}>
            <ProfileLinkContainer role={user.type}>
              <img src={currentUserProfile.imageUrl} alt="fotoPerfil" />
              <Link to="/profile">
                <strong>{user.name}</strong>
                <span>
                  Perfil&nbsp;
                  <FiEdit size={14} />
                </span>
              </Link>
            </ProfileLinkContainer>

            <AdminLockedOption role={user.type}>
              <Link to="/dashboard">
                <FiLayers size={16} />
                <p>Dashboard</p>
              </Link>
            </AdminLockedOption>

            <SpecialistOnlyOption role={user.type}>
              <Link to="/myagenda">
                <FiWatch size={16} />
                <p>Agenda</p>
              </Link>
            </SpecialistOnlyOption>

            <OptionLinkContainer>
              <Link to="/history">
                <FiBookOpen size={16} />
                <p>Histórico</p>
              </Link>
            </OptionLinkContainer>

            <SpecialistLockedSection role={user.type}>
              <main>
                <FaRegAddressCard size={16} />
                <p>Pacientes</p>
              </main>

              <SupervisorOnlyOption role={user.type}>
                <Link to="/pacients/create">
                  <FiPlus size={16} />
                  <p>Criar</p>
                </Link>
              </SupervisorOnlyOption>

              <OptionLinkContainer>
                <Link to="/pacients">
                  <FiList size={16} />
                  <p>Listar</p>
                </Link>
              </OptionLinkContainer>
            </SpecialistLockedSection>

            <AdminLockedSection role={user.type}>
              <main>
                <FiFileText size={16} />
                <p>Consultas</p>
              </main>

              <SupervisorOnlyOption role={user.type}>
                <Link to="/consults/create">
                  <FiPlus size={16} />
                  <p>Criar</p>
                </Link>
              </SupervisorOnlyOption>

              <OptionLinkContainer>
                <Link to="/consults">
                  <FiList size={16} />
                  <p>Listar</p>
                </Link>
              </OptionLinkContainer>
            </AdminLockedSection>

            <SpecialistLockedSection role={user.type}>
              <main>
                <FaRegAddressCard size={16} />
                <p>Cadastro</p>
              </main>

              <OptionLinkContainer>
                <Link to="/register/specialist">
                  <FaUserMd size={16} />
                  <p>Especialista</p>
                </Link>
              </OptionLinkContainer>

              <AdminOnlyOption role={user.type}>
                <Link to="/register/supervisor">
                  <FaUserTie size={16} />
                  <p>Supervisor</p>
                </Link>
              </AdminOnlyOption>
            </SpecialistLockedSection>
          </MenuOption>
        </SideMenuBox>
      </SideMenuBoxContainer>
    </>
  );
};

export default Menu;
