import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Menu from '../../components/Menu';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Header, Main, ButtonContainer } from './styles';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  return (
    <>
      <Menu />
      <Container>
        <Main>
          <Header>
            <img
              src="https://avatars1.githubusercontent.com/u/39497501?s=460&u=df068176118dc47cbf565206307bbf62012fdb8b&v=4"
              alt="ProfileImage"
            />
          </Header>

          <Form onSubmit={() => {}}>
            <div>
              <span>Nome</span>
              <Input name="name" type="text" placeholder="Nome" />

              <span>Telefone</span>
              <Input name="fone" type="text" placeholder="Nome" />

              <span>E-mail</span>
              <Input name="email" type="text" placeholder="Nome" />
            </div>

            <div>
              <span>Endereço</span>
              <Input name="andress" type="text" placeholder="Nome" />

              <span>Descrição</span>
              <Input name="number" type="text" placeholder="Nome" />
            </div>
          </Form>
          <ButtonContainer>
            <Button>Editar</Button>
          </ButtonContainer>
        </Main>
      </Container>
    </>
  );
};

export default Profile;
