import { ActionFunctionArgs } from 'react-router-dom';
import { SavingFormObject } from '../form_objects/savings';
import { plainToInstance } from 'class-transformer';

const create = async ({ request }: ActionFunctionArgs) => {
  const response = await fetch(`/api/savings`, {
    method: 'post',
    body: JSON.stringify(Object.fromEntries(await request.formData())),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw response;
  }

  return plainToInstance(SavingFormObject, await response.json());
};

const update = async ({ request, params }: ActionFunctionArgs) => {
  if (!params.savingId) return;

  const response = await fetch(`/api/savings/${params.savingId}`, {
    method: 'put',
    body: JSON.stringify(Object.fromEntries(await request.formData())),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw response;
  }

  return plainToInstance(SavingFormObject, await response.json());
};

export { create as createSavingAction, update as updateSavingAction };
