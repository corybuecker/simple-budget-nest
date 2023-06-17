import { ActionFunctionArgs } from 'react-router-dom';
import { plainToInstance } from 'class-transformer';
import { AccountFormObject } from '../form_objects/accounts';

const create = async ({ request }: ActionFunctionArgs) => {
  const data = plainToInstance(
    AccountFormObject,
    Object.fromEntries(await request.formData()),
  );

  const response = await fetch(`/api/accounts`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw response;
  }

  return plainToInstance(AccountFormObject, await response.json());
};

const update = async ({ request, params }: ActionFunctionArgs) => {
  if (!params?.accountId) {
    throw Error('missing account ID');
  }

  const formValues = Object.fromEntries(await request.formData());
  const data = plainToInstance(AccountFormObject, formValues);

  const response = await fetch(`/api/accounts/${params.accountId}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw response;
  }

  return plainToInstance(AccountFormObject, await response.json());
};

export { create as createAccountAction, update as updateAccountAction };
