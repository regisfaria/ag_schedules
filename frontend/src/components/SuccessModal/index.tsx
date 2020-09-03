import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Modal, ButtonContainer } from './styles';

import Button from '../Button';
import Section from '../Section';
import SectionRow from '../SectionRow';

interface Props {
  modalStatus: boolean;
  title: string;
  subTitle?: string;
  btnFunction: Function;
  currentPageBtnLabel: string;
  redirectTo: string;
  redirectLabel: string;
}

const SuccessModal: React.FC<Props> = ({
  modalStatus,
  title,
  subTitle = undefined,
  btnFunction,
  currentPageBtnLabel,
  redirectTo,
  redirectLabel,
}) => {
  return (
    <Modal isOpen={modalStatus}>
      <Section>
        <FiCheck size={300} />
        <strong>{title}</strong>
        {!!subTitle && <span>{subTitle}</span>}

        <SectionRow>
          <ButtonContainer>
            <Button type="button" onClick={() => btnFunction(true)}>
              {currentPageBtnLabel}
            </Button>
          </ButtonContainer>

          <Link to={redirectTo}>
            <ButtonContainer>
              <Button type="button" color="yellow">
                {redirectLabel}
              </Button>
            </ButtonContainer>
          </Link>
        </SectionRow>
      </Section>
    </Modal>
  );
};

export default SuccessModal;
