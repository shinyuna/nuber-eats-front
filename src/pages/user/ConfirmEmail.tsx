import React, { useEffect } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { verifyEmail, verifyEmailVariables } from '../../api-types/verifyEmail';
import { useMe } from '../../hooks/useMe';
import { useHistory } from 'react-router';
import { HelmetTitle } from '../../components/HelmetTitle';

const VERTIFY_EMAIL_MUTATAION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData, refetch } = useMe();
  const history = useHistory();
  const onCompleted = async (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      // api 다시 한 번 콜해서 cache 업데이트
      await refetch();
      history.push('/');
    }
  };
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(VERTIFY_EMAIL_MUTATAION, {
    onCompleted,
  });
  useEffect(() => {
    const [_, code] = window.location.href.split('code=');
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-52">
      <HelmetTitle title={'Verify Email | Nuber Eats'} />
      <h2 className="mb-2 text-xl font-medium">Confirming Email...</h2>
      <p className="text-trueGray-600">Please wait, don't close this page...</p>
    </div>
  );
};
