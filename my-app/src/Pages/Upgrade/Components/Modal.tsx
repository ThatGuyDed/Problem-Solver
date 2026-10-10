import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { cards } from './CardData';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(440px, 92vw)',
  maxHeight: '90vh',
  overflowY: 'auto' as const,
  bgcolor: 'background.paper',
  color: 'text.primary',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const processingMessages = [
  'Verifying your sock...',
  'Consulting the pair committee...',
  'Processing the processing fee...',
  'Locating your sock (unsuccessful)...',
];

type Phase = 'form' | 'processing' | 'done';

interface PaymentModalProps {
  optionId: number;
  open: boolean;
  onClose: () => void;
}

const money = (n: number) => `$${n.toFixed(2)}`;

export default function PaymentModal({ optionId, open, onClose }: PaymentModalProps) {
  const [phase, setPhase] = React.useState<Phase>('form');
  const [messageIndex, setMessageIndex] = React.useState(0);
  const [name, setName] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvc, setCvc] = React.useState('');

  const card = cards.find((c) => c.id === optionId);

  // Reset everything each time the modal opens
  React.useEffect(() => {
    if (open) {
      setPhase('form');
      setMessageIndex(0);
      setName('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
    }
  }, [open]);

  // Fake processing sequence
  React.useEffect(() => {
    if (phase !== 'processing') return;
    const ticker = setInterval(
      () => setMessageIndex((i) => (i + 1) % processingMessages.length),
      700,
    );
    const finish = setTimeout(() => setPhase('done'), 3200);
    return () => {
      clearInterval(ticker);
      clearTimeout(finish);
    };
  }, [phase]);

  if (!card) return null;

  // Pull the number out of a string like '$2.99/mo.'
  const price = parseFloat(card.description[0].replace(/[^0-9.]/g, '')) || 0;
  const isGalactic = card.title.includes('Galactic');

  const lineItems = [
    { label: card.title, amount: price },
    { label: 'Processing fee', amount: price * 0.12 },
    { label: 'Fee processing fee', amount: price * 0.12 * 0.05 },
    { label: 'Sock tax', amount: 0.99 },
    ...(isGalactic ? [{ label: 'Interplanetary surcharge', amount: 12.0 }] : []),
  ];
  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);

  const canPay = name.trim() && cardNumber.length >= 19 && expiry.length >= 4 && cvc.length >= 3;

  const handleCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, '$1 ').trim());
  };

  const handleClose = () => {
    if (phase === 'processing') return; // no escape while processing
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="payment-modal-title"
      aria-describedby="payment-modal-description"
    >
      <Box sx={style}>
        {phase === 'form' && (
          <>
            <Typography id="payment-modal-title" variant="h5" component="h2" sx={{ fontWeight: 700 }}>
              Complete your purchase
            </Typography>
            <Typography id="payment-modal-description" color="text.secondary" sx={{ mt: 1 }}>
              You selected {card.title}.
            </Typography>

            <Box sx={{ mt: 3 }}>
              {lineItems.map((item) => (
                <Box
                  key={item.label}
                  sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="body2">{money(item.amount)}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 700 }}>Due today</Typography>
                <Typography sx={{ fontWeight: 700 }}>{money(total)}</Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3, display: 'grid', gap: 2 }}>
              <TextField
                label="Name on card"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Card number"
                size="small"
                value={cardNumber}
                onChange={(e) => handleCardNumber(e.target.value)}
                placeholder="0000 0000 0000 0000"
                fullWidth
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  label="Expiry"
                  size="small"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value.slice(0, 5))}
                  placeholder="MM/YY"
                />
                <TextField
                  label="CVC"
                  size="small"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                />
              </Box>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Demo only. Do not enter real card details. Nothing is sent or stored.
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" disabled={!canPay} onClick={() => setPhase('processing')}>
                Pay {money(total)}
              </Button>
            </Box>
          </>
        )}

        {phase === 'processing' && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <CircularProgress />
            <Typography id="payment-modal-title" variant="h6" component="h2" sx={{ mt: 3 }}>
              Processing your payment
            </Typography>
            <Typography id="payment-modal-description" color="text.secondary" sx={{ mt: 1 }}>
              {processingMessages[messageIndex]}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Please do not close this window. Closing it is not covered by your plan.
            </Typography>
          </Box>
        )}

        {phase === 'done' && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography id="payment-modal-title" variant="h5" component="h2" sx={{ fontWeight: 700 }}>
              Payment received
            </Typography>
            <Typography id="payment-modal-description" color="text.secondary" sx={{ mt: 2 }}>
              Your {card.title} is now active, pending a 90-day review.
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Reference: SSG-{String(optionId).padStart(4, '0')}-PENDING. Charges are
              non-refundable, non-transferable and non-sock.
            </Typography>
            <Button variant="contained" sx={{ mt: 3 }} onClick={onClose}>
              Done
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}