import React, { useCallback } from 'react';
import { FiCheckCircle, FiCheck } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Modal, ButtonContainer } from './styles';

import Button from '../Button';
import Section from '../Section';
import SectionRow from '../SectionRow';

interface Props {
  modalStatus: boolean;
  title: string;
  subTitle?: string;
  currentPageRedirectLabel: string;
  secondLink: string;
  secondLinkLabel: string;
}

const SuccessModal: React.FC<Props> = ({
  modalStatus,
  title,
  subTitle = undefined,
  currentPageRedirectLabel,
  secondLink,
  secondLinkLabel,
}) => {
  const history = useHistory();

  const renderCurrentComponent = useCallback(() => {
    history.push('/dashboard');
    history.goBack();
  }, [history]);

  return (
    <Modal isOpen={modalStatus}>
      <Section>
        <FiCheck size={300} />
        <strong>{title}</strong>
        {!!subTitle && <span>{subTitle}</span>}

        <SectionRow>
          <ButtonContainer>
            <Button type="button" onClick={renderCurrentComponent}>
              {currentPageRedirectLabel}
            </Button>
          </ButtonContainer>

          <Link to={secondLink}>
            <ButtonContainer>
              <Button type="button" color="yellow">
                {secondLinkLabel}
              </Button>
            </ButtonContainer>
          </Link>
        </SectionRow>
      </Section>
    </Modal>
  );
};

export default SuccessModal;
