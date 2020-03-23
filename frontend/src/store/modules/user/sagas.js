import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateUserSuccess, updateUserFailure } from './actions';

export function* updateUser({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.currentPassword ? rest : {}),
    };

    const response = yield call(api.put, '/users', profile);

    toast.success('Perfil atualizado com sucesso.');

    yield put(updateUserSuccess(response.data));
  } catch (e) {
    toast.error('Erro ao atualizar perfil. Verifique seus dados');
    yield put(updateUserFailure());
  }
}

export default all([takeLatest('@user/UPDATE_USER_REQUEST', updateUser)]);
