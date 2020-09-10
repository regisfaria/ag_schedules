import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  useCallback,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { FiEdit3 } from 'react-icons/fi';

import api from '../../services/api';
import Menu from '../../components/Menu';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import Main from '../../components/Main';
import Section from '../../components/Section';
import ReactInputMask from '../../components/ReactInputMask';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Header,
  ButtonEditContainer,
  TextAreaContainer,
  ButtonSaveAndCancelContainer,
  AvatarInput,
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

interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  cep?: string;
  uf?: string;
  city?: string;
  street?: string;
  andressNumber?: string;
  description?: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user } = useAuth();
  const [editProfile, setEditProfile] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const [states, setStates] = useState<StatesInfo[]>([{} as StatesInfo]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedUf, setSelectedUF] = useState('0');
  const [profileInformations, setProfileInformations] = useState<ProfileData>({
    name: 'All Next',
    email: 'allnext@allnext.com',
    phone: '',
    cep: '',
    uf: '',
    city: '',
    street: '',
    andressNumber: '',
    description: '',
  });

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
    setEditProfile(true);
  }, []);

  const handleCancelEditProfile = useCallback(() => {
    setEditProfile(false);
    formRef.current?.setFieldValue('phone', profileInformations.phone);
    formRef.current?.setFieldValue('cep', profileInformations.cep);
    formRef.current?.setFieldValue('uf', profileInformations.uf);
    formRef.current?.setFieldValue('city', profileInformations.city);
    formRef.current?.setFieldValue('street', profileInformations.street);
    formRef.current?.setFieldValue(
      'addressNumber',
      profileInformations.andressNumber,
    );
    formRef.current?.setFieldValue(
      'description',
      profileInformations.description,
    );
  }, [profileInformations]);

  const handleSubmit = useCallback((data: ProfileData) => {
    setProfileInformations(element => {
      return {
        ...element,
        phone: data.phone,
        cep: data.cep,
        uf: data.uf,
        city: data.city,
        street: data.street,
        andressNumber: data.andressNumber,
        description: data.description,
      };
    });
  }, []);

  return (
    <>
      {user.type === 'admin' && <Redirect to={{ pathname: '/dashboard' }} />}

      <Menu />
      <Container>
        <Header>
          <AvatarInput>
            <img
              src="https://avatars0.githubusercontent.com/u/69481836?s=200&v=4"
              alt="ProfileImage"
            />
            <button type="button">
              <FiEdit3 />
            </button>
          </AvatarInput>
        </Header>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Main>
            <Section>
              <Input
                name="name"
                type="text"
                text="Nome:&nbsp;"
                defaultValue={profileInformations.name}
                disabled
              />

              <Input
                name="email"
                type="text"
                text="Email:&nbsp;"
                id="InputDisable"
                defaultValue={profileInformations.email}
                disabled
              />

              <ReactInputMask
                name="phone"
                mask="+55 (99)99999-9999"
                type="tel"
                text="Telefone:&nbsp;"
                disabled={!editProfile}
                defaultValue={profileInformations.phone}
              />

              <ReactInputMask
                name="cep"
                mask="99.999-999"
                type="string"
                text="CEP:&nbsp;"
                disabled={!editProfile}
                defaultValue={profileInformations.cep}
              />

              <Select
                name="uf"
                onChange={handleSelectedUf}
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
            </Section>

            <Section>
              <Select
                name="city"
                onChange={handleSelectedCity}
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
                text="Número:&nbsp;"
                disabled={!editProfile}
              />

              <Input
                name="addressComplement"
                type="text"
                text="Complemento:&nbsp;"
                disabled={!editProfile}
              />
            </Section>
          </Main>

          <TextAreaContainer>
            <TextArea
              name="description"
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
            <Button type="submit">Salvar</Button>
            <Button type="button" onClick={handleCancelEditProfile}>
              Cancelar
            </Button>
          </ButtonSaveAndCancelContainer>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
