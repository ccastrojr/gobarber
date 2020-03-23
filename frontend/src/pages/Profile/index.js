import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import AvatarInput from './AvatarInput';

import { updateUserRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  function handleSignOut() {
    toast.warn('Até mais! :)');
    dispatch(signOut());
  }

  function handleSubmit(data) {
    dispatch(updateUserRequest(data));
  }

  return (
    <Container>
      <Form initialData={user} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input type="text" name="name" placeholder="Nome completo" />
        <Input type="email" name="email" placeholder="Seu endereço de e-mail" />

        <hr />

        <Input
          type="password"
          name="currentPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Sua nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme nova senha"
        />

        <button type="submit">Atualizar Perfil</button>
      </Form>

      <button type="button" onClick={() => handleSignOut()}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
