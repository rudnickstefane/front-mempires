/* eslint-disable @typescript-eslint/no-explicit-any */
import { initMercadoPago, Payment, StatusScreen } from '@mercadopago/sdk-react';
import { Box } from '@mui/material';
import { VariantType } from 'notistack';
import { useState } from 'react';
import { MutationCreatePayment } from '../../../../common/graphql';
import { useBackendForFrontend } from '../../../../common/hooks/useBackendForFrontend';
import { GetErrorMessage } from '../../../../common/utils';

initMercadoPago('TEST-3b653143-0413-4be4-9367-dae26eeb1a36');

interface PaymentResult {
  createPayment?: {
    id?: string;
    status?: string;
    init_point?: string;
    detail?: string;
    qr_code?: string; // Adicionado para PIX
    qr_code_base64?: string; // Adicionado para PIX
  };
  status?: string;
}

export const PaymentPage = ({data, preference, enqueueSnackbar, onStatusChange}: {
  data?: any;
  preference?: any;
  enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
  onStatusChange?: (status: string) => void;
}) => {
  const { request } = useBackendForFrontend();
  const [amount] = useState(Number(String(data.amount).replace(/\./g, '').replace(',', '.')));
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [showStatusScreen, setShowStatusScreen] = useState(false);

  const handleStatusUpdate = (status: string) => {
    setPaymentResult((prev) => ({ ...prev, status }));
    setShowStatusScreen(true);
    onStatusChange?.(status);
  };

  let maxInstallments = 1;

  switch (amount) {
    case 1.919:
      maxInstallments = 12;
      break;

    case 539.9:
      maxInstallments = 12;
      break;

    default:
      maxInstallments = 1;
  }

  return (
    <Box>
      <style>{`
        .mp-checkout-bricks__payment-form {
          padding: 0 !important;
        }

        .mp-checkout-bricks__payment-form button {
          position: absolute;
          right: 0;
          height: 48px;
        }

        .mp-checkout-bricks__payment-form button:hover {
          background: red;
        }

        #statusScreenBrick_container {
          border: 1px solid #EAECF0;
          border-radius: 13px;
        }
      `}</style>
      {!showStatusScreen ? (
        <Payment
          initialization={{
            amount,
            preferenceId: preference?.createPaymentPreference.id,
          }}
          customization={{
            paymentMethods: {
              // ticket: 'all',
              // bankTransfer: 'all',
              creditCard: 'all',
              // prepaidCard: 'all',
              debitCard: 'all',
              // mercadoPago: 'all',
              maxInstallments,
            },
            visual: {
              hideFormTitle: true,
              style: {
                theme: 'default',
                customVariables: {
                  baseColor: '#ff0336',
                  baseColorSecondVariant: '#ff0000',
                }
              },
            },
          }}
          onSubmit={async (formData) => {
            try {
              const response: PaymentResult = await request(MutationCreatePayment, {
                data: {
                  ...formData,
                  description: data.description,
                  external_reference: `TRA-${data.transactionCode}`,
                  transaction_amount: amount,
                },
              });
              setPaymentResult(response);
              handleStatusUpdate(response.createPayment?.status ?? '');
              setShowStatusScreen(true);
              enqueueSnackbar('Pagamento processado com sucesso!', { variant: 'success' });
            } catch (error) {
              const message = GetErrorMessage(error, 'Erro ao processar o pagamento');
              enqueueSnackbar(message, { variant: 'error' });
              setPaymentResult({ status: 'rejected' });
              setShowStatusScreen(true);
            }
          }}
        />
      ) : (
        <StatusScreen
          initialization={{
            paymentId: paymentResult?.createPayment?.id ?? '',
          }}
          customization={{
            visual: {
              showExternalReference: true,
              style: {
                theme: 'default',
              },
            },
          }}
        />
      )}
    </Box>
  );
}