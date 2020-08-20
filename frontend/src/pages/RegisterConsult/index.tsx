import React, { useCallback, useRef, useEffect, useState } from 'react';

import { FiArrowLeft, FiDollarSign } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link /* useHistory */ } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Select from '../../components/Select';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Section from '../../components/Section';
import Main from '../../components/Main';
import ConsultEnrolment from '../../components/ConsultEnrolment';

import { Container, AnimatedContent } from './styles';

import Menu from '../../components/Menu';

interface ConsultFormData {
  pacient: string;
  specialist: string;
  payment: string;
  status: string;
}

const RegisterConsult: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  // const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ConsultFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          pacient: Yup.string().required('Paciente obrigatório'),
          specialist: Yup.string().required('Especialista obrigatório'),
          consultDate: Yup.date().required('Data da consulta obrigatória'),
          payment: Yup.string().required('Pagamento obrigatório'),
          status: Yup.string().required('Status obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Consulta cadastrada!',
          description: 'A consulta ja esta disponivel para o especialista!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro durante o cadastro, verifique os dados e tente novamente.',
        });
      }
    },
    [addToast],
  );

  const printData = useCallback((data: ConsultFormData) => {
    console.log(data);
  }, []);

  return (
    <>
      <Menu />

      <Container>
        <AnimatedContent>
          <PageHeader title="Criar uma Consulta" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Main>
              <Section>
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
