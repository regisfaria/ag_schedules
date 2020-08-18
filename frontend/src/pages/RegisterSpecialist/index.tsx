import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FaUserMd } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, AnimatedContent } from './styles';

import Menu from '../../components/Menu';
import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterSpecialist: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          confirmEmail: Yup.string()
            .oneOf([Yup.ref('email')], 'Os e-mails não são iguais')
            .required('Os e-mails não são iguais')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'As senhas não conferem')
            .required('As senhas não conferem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'O usuario foi criado e esta pronto para login!',
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
    [addToast, history],
  );

  return (
    <>
      <Menu />

      <Container>
        <AnimatedContent>
          <PageHeader title="Cadastre um Especialista" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Section>
              <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
              <Input
                name="email"
                type="email"
                icon={FiMail}
                placeholder="E-mail"
              />
              <Input
                name="confirmEmail"
                type="email"
                icon={FiMail}
                placeholder="Confirme o e-mail"
              />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />
              <Input
                name="confirmPassword"
                icon={FiLock}
                type="password"
                placeholder="Confirme a senha"
              />

              <Input
                type="text"
                name="type"
                icon={FaUserMd}
                value="specialist"
                id="userType"
                contentEditable={false}
                disabled
              />
            </Section>

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/dashboard">
            <FiArrowLeft /> Voltar para o Dashboard
          </Link>
        </AnimatedContent>
      </Container>
    </>
  );
};

export default RegisterSpecialist;
