import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

// Import Icons
import { FiArrowLeft, FiPhone, FiUser } from 'react-icons/fi';
import { FaTransgender } from 'react-icons/fa';
import { AiOutlineFieldNumber } from 'react-icons/ai';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Main from '../../components/Main';
import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';

import { Container, AnimatedContent } from './styles';

import Menu from '../../components/Menu';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

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

const RegisterPacient: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const [states, setStates] = useState<StatesInfo[]>([{} as StatesInfo]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedUf, setSelectedUF] = useState('0');

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          cpf: Yup.string().required('CPF obrigatório'),
          phoneNumber: Yup.string().required('Numero de telefone obrigatório'),
          gender: Yup.string().required('Gênero obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/pacients', data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Paciente Cadastrado!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro de paciente',
          description:
            'Ocorreu um erro durante o cadastro, verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, history],
  );

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

  return (
    <>
      <Menu />

      <Container>
        <AnimatedContent>
          <PageHeader
            title="Cadastre um Paciente"
            subTitle='Os campos precedidos por "*" são obrigatórios'
          />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Main>
              <Section title="Dados Pessoais">
                <Input
                  name="name"
                  icon={FiUser}
                  type="text"
                  placeholder="*Nome"
                />
                <Input name="bornDate" type="date" text="Nascimento:&nbsp;" />
                <Input
                  name="cpf"
                  icon={AiOutlineFieldNumber}
                  type="text"
                  placeholder="*CPF"
                />
                <Select name="gender" icon={FaTransgender}>
                  <option value="" selected hidden>
                    *Sexo
                  </option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </Select>

                <Input
                  name="phoneNumber"
                  type="text"
                  icon={FiPhone}
                  placeholder="*Telefone para contato"
                />
              </Section>

              <Section title="Endereço">
                <Select
                  onChange={handleSelectedUf}
                  value={selectedUf}
                  name="uf"
                  id="uf"
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

                <Input name="street" type="text" placeholder="Rua" />
                <Input name="addressNumber" type="text" placeholder="Numero" />
                <Input name="cep" type="text" placeholder="CEP" />
              </Section>
            </Main>

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

export default RegisterPacient;
