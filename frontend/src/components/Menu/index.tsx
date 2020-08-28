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
import { BsPersonFill } from 'react-icons/bs';

import { useAuth } from '../../hooks/auth';

import {
  Backdrop,
  ShowMenu,
  CloseMenu,
  Logout,
  SideMenuBoxContainer,
  SideMenuButtons,
  SideMenuBox,
  MenuOption,
  LinkContainer,
  AgentLockedLinkContainer,
  SpecialistLockedLinkContainer,
  AdminOnlyLinkContainer,
} from './styles';

const Menu: React.FC = () => {
  const [menuState, setMenuState] = useState(false);
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
            <Link to="/profile">
              <div>
                <p>Perfil</p>
              </div>
            </Link>

            <Link to="/dashboard">
              <div>
                <FiLayers size={16} />
                <p>Dashboard</p>
              </div>
            </Link>
          </MenuOption>
        </SideMenuBox>
      </SideMenuBoxContainer>
    </>
  );
};

export default Menu;
