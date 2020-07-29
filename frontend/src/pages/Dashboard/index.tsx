import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { FiExternalLink, FiUsers } from 'react-icons/fi';

import SideMenu from '../../components/SideMenu';
import SearchBar from '../../components/SearchBar';

import {
  IncomingTasks,
  RecentLeads,
  CalendarSection,
  Task,
  Tag,
  Lead,
} from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <SideMenu />
    </>
  );
};

export default Dashboard;
