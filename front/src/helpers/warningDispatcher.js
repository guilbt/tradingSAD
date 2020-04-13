import URL_PATTERNS from '../urlPatterns';

export function dispatchCustomWarning(customError) {
  document.dispatchEvent(new CustomEvent('WARN-message', { detail: customError }));
}

const CustomNetworkError = {
  type: 'error',
  name: 'Conexão',
  message: 'Houve um erro de conexão ao servidor, tente novamente mais tarde.',
};

export function dispatchCustomNetworkError() {
  dispatchCustomWarning(CustomNetworkError);
}

const CustomAuthError = {
  type: 'error',
  name: 'TreatedAuthError',
  message: 'Não tem autorização para acessar o recurso, provável que o seu token de autorização foi invalidado. Por favor, faça login novamente',
};

export function dispatchCustomAuthError() {
  dispatchCustomWarning(CustomAuthError);
  window.location.href = (`/#${URL_PATTERNS.LOGIN}`);
}

const CustomUnknownError = {
  type: 'error',
  name: 'Erro Desconhecido',
  message: 'Entre em contato com o suporte',
};

export function dispatchCustomUnknownError() {
  dispatchCustomWarning(CustomUnknownError);
}

const CustomWrongCredError = {
  type: 'error',
  name: 'Credênciais Inválidas',
  message: 'E-mail não encontrado ou não condiz com a senha informada',
};

export function dispatchCustomWrongCredError() {
  dispatchCustomWarning(CustomWrongCredError);
}

const SuccessLoginWarning = {
  type: 'success',
  name: 'Login Efetuado',
  message: 'Agora você tem acesso à aplicação',
  timeout: 3000,
};
export function dispatchSuccessLoginWarning() {
  dispatchCustomWarning(SuccessLoginWarning);
}

