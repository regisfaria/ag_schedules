import React, { useCallback, useRef, useEffect, useState } from 'react';

import { FiArrowLeft, FiDollarSign } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, Redirect } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { useReset } from '../../hooks/reset';

import getValidationErrors from '../../utils/getValidationErrors';

import Select from '../../components/Select';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Section from '../../components/Section';
import Main from '../../components/Main';
import ConsultEnrolment from '../../components/ConsultEnrolment';
import SuccessModal from '../../components/SuccessModal';

import { Container, AnimatedContent } from './styles';

import Menu from '../../components/Menu';

interface ConsultFormData {
  pacient: string;
  specialist: string;
  consultDate: string;
  consultHour: string;
  payment: string;
  status: string;
}

interface PacientResponse {
  id: string;
  name: string;
  cpf: string;
}

const RegisterConsult: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [pacients, setPacients] = useState<PacientResponse[]>([]);
  const [modalStatus, setModalStatus] = useState(false);

  const { addToast } = useToast();
  const { user } = useAuth();
  const { resetCreateConsult, resetCreateConsultPage } = useReset();

  const handleSubmit = useCallback(
    async (data: ConsultFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          pacient: Yup.string().required('Paciente obrigatório'),
          specialist: Yup.string().required('Especialista obrigatório'),
          consultDate: Yup.date().required('Data da consulta obrigatória'),
          consultHour: Yup.string().required('Hora da consulta obrigatória'),
          payment: Yup.string().required('Pagamento obrigatório'),
          status: Yup.string().required('Status obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/consults', data);

        reset();
        setModalStatus(true);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        console.log(error);

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro durante o cadastro, verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, setModalStatus],
  );

  useEffect(() => {
    api.get('/pacients/supervisor').then(response => {
      setPacients(response.data);
    });
  }, []);

  useEffect(() => {
    if (resetCreateConsult === true) {
      resetCreateConsultPage(false);
      setModalStatus(false);
    }
  }, [resetCreateConsult]);

  return (
    <>
      {user.type !== 'supervisor' && (
        <Redirect to={{ pathname: '/dashboard' }} />
      )}
      <Menu />

      <Container>
        <AnimatedContent>
          <SuccessModal
            modalStatus={modalStatus}
            title="Consulta criada com sucesso"
            subTitle="Deseja criar outra consulta?"
            btnFunction={resetCreateConsultPage}
            currentPageBtnLabel="Sim"
            redirectTo="/dashboard"
            redirectLabel="Nao"
          />
          <PageHeader title="Criar uma Consulta" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Main>
              <Section>
                <Select name="pacient" icon={FaUser}>
                  <option value="" selected hidden>
                    Paciente
                  </option>
                  {pacients.map(pacient => (
                    <option key={pacient.id} value={pacient.id}>
                      {pacient.name} - {pacient.cpf}
                    </option>
                  ))}
                </Select>

                <ConsultEnrolment />

                <Select name="payment" icon={FiDollarSign}>
                  <option value="" selected hidden>
                    Pagamento
                  </option>
                  <option value="50%">Pago 50%</option>
                  <option value="100%">Pago 100%</option>
                </Select>

                <Input
                  type="text"
                  name="status"
                  text="Status:"
                  value="Em aberto"
                  id="consultStatus"
                  contentEditable={false}
                  disabled
                />

                <Button type="submit">Criar</Button>
              </Section>
            </Main>
          </Form>

          <Link to="/dashboard">
            <FiArrowLeft /> Voltar para o Dashboard
          </Link>
        </AnimatedContent>
      </Container>
    </>
  );
};

export default RegisterConsult;
