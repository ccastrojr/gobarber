import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { updateUserSuccess, updateUserFailure } from './actions';

export function* updateUser({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.currentPassword ? rest : {}),
    };

    const response = yield call(api.put, '/users', profile);

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso.');

    yield put(updateUserSuccess(response.data));
  } catch (e) {
    Alert.alert(
      'Falha na atualização',
      'Erro ao atualizar seu perfil, verifique seus dados'
    );
    yield put(updateUserFailure());
  }
}

export default all([takeLatest('@user/UPDATE_USER_REQUEST', updateUser)]);
