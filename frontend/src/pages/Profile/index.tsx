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
        <Header>
          <img
            src="https://avatars1.githubusercontent.com/u/39497501?s=460&u=df068176118dc47cbf565206307bbf62012fdb8b&v=4"
            alt="ProfileImage"
          />
        </Header>
        <Main>
          <Form onSubmit={() => {}}>
            <div>
              <span>Nome</span>
              <Input name="name" type="text" placeholder="Nome" disabled />
            </div>

            <div>
              <span>E-mail</span>
              <Input name="email" type="text" placeholder="Nome" />
            </div>

            <div>
              <span>Telefone</span>
              <Input name="fone" type="text" placeholder="Nome" />
            </div>

            <div>
              <span>CEP</span>
              <Input name="andress" type="text" placeholder="cep" />
            </div>
            <div>
              <span>Estado</span>
              <Input name="andress" type="text" placeholder="Nome" />
            </div>
            <div>
              <span>Cidade</span>
              <Input name="andress" type="text" placeholder="Nome" />
            </div>

            <div>
              <span>Rua</span>
              <Input name="andress" type="text" placeholder="Nome" />
            </div>

            <div>
              <span>Número/Complemento</span>
              <Input
                name="addressNumber"
                type="text"
                placeholder="Número/Complemento"
              />
            </div>

            <div>
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
