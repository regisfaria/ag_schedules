import React, { useCallback, useRef } from 'react';

import { FiArrowLeft, FiDollarSign } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link /* useHistory */ } from 'react-router-dom';

// import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Select from '../../components/Select';
import Input from '../../components/Input';
import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';

import { Container, Content } from './styles';

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

  return (
    <>
      <Menu />

      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Criar consulta</h1>

            <DatePicker name="consultDate" text="Data e Horario:" />

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
              text="Status:&nbsp;"
              value="Em aberto"
              id="consultStatus"
              contentEditable={false}
              disabled
            />

            <Button type="submit">Criar</Button>
          </Form>

          <Link to="/dashboard">
            <FiArrowLeft /> Voltar para o Dashboard
          </Link>
        </Content>
      </Container>
    </>
  );
};

export default RegisterConsult;
