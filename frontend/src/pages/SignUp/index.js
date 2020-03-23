import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string('Informe um nome válido').required(
    'Digite seu nome para continuar'
  ),
  email: Yup.string()
    .email('Digite um e-mail válido para continuar')
    .required('O campo e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Sua senha precisa ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input name="password" type="password" placeholder="Digite sua senha" />

        <button type="submit">Cadastrar</button>

        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </>
  );
}
