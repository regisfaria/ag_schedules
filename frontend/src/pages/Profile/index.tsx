import React, { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { Form } from '@unform/web';
import axios from 'axios';

import Menu from '../../components/Menu';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import Main from '../../components/Main';
import Section from '../../components/Section';

/* import { useToast } from '../../hooks/toast'; */

import {
  Container,
  Header,
  ButtonEditContainer,
  TextAreaContainer,
  ButtonSaveAndCancelContainer,
} from './styles';

interface IBGEUFResponse {
  sigla: string;
  nome: string;
}

interface IBGECityResponse {
  nome: string;
}

interface StatesInfo {
  uf: string;
  name: string;
}
let controlEdit = true;

const Profile: React.FC = () => {
  /* const { addToast } = useToast(); */
  const [editProfile, setEditProfile] = useState(!controlEdit);

  const [states, setStates] = useState<StatesInfo[]>([{} as StatesInfo]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedUf, setSelectedUF] = useState('0');

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        const statesInfo = response.data.map(ufs => {
          const uf = ufs.sigla;
          const name = ufs.nome;

          const stateInformation = { uf, name } as StatesInfo;

          return stateInformation;
        });

        setStates(statesInfo);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '') {
      return;
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        const ufCities = response.data.map(city => city.nome);

        setCities(ufCities);
      });
  }, [selectedUf]);

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const selectUf = event.target.value;
    setSelectedUF(selectUf);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  const handleEditProfile = useCallback(() => {
    controlEdit = !controlEdit;
    setEditProfile(!controlEdit);
  }, []);

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
        <Form onSubmit={() => {}}>
          <Main>
            <Section>
              <Input name="name" type="text" text="Nome:&nbsp;" disabled />

              <Input
                name="email"
                type="text"
                text="Email:&nbsp;"
                id="InputDisable"
                disabled
              />

              <Input
                name="fone"
                type="text"
                text="Telefone:&nbsp;"
                disabled={!editProfile}
              />

              <Input
                name="cep"
                type="text"
                text="CEP:&nbsp;"
                disabled={!editProfile}
              />
            </Section>

            <Section>
              <Select
                onChange={handleSelectedUf}
                value={selectedUf}
                name="uf"
                id="uf"
                disabled={!editProfile}
              >
                <option value="" selected hidden>
                  Estado
                </option>
                {states.map(state => (
                  <option key={state.uf} value={state.uf}>
                    {state.name}
                  </option>
                ))}
              </Select>

              <Select
                onChange={handleSelectedCity}
                value={selectedCity}
                name="city"
                id="city"
                disabled={!editProfile}
              >
                <option value="" selected hidden>
                  Cidade
                </option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>

              <Input
                name="street"
                type="text"
                text="Rua:&nbsp;"
                disabled={!editProfile}
              />

              <Input
                name="addressNumber"
                type="text"
                text="Número/Complemento:&nbsp;"
                disabled={!editProfile}
              />
            </Section>
          </Main>

          <TextAreaContainer>
            <TextArea
              name="descrição"
              placeholder="Descrição:&nbsp;"
              disabled={!editProfile}
            />
          </TextAreaContainer>
          <ButtonEditContainer cancel={Boolean(editProfile)}>
            <Button type="button" onClick={handleEditProfile}>
              Editar
            </Button>
          </ButtonEditContainer>

          <ButtonSaveAndCancelContainer cancel={Boolean(editProfile)}>
            <Button>Salvar</Button>
            <Button type="button" onClick={handleEditProfile}>
              Cancelar
            </Button>
          </ButtonSaveAndCancelContainer>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
