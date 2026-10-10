import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

interface FormState {
  policy: string;
  colour: string;
  pattern: string;
  sentimentalValue: number;
  side: 'left' | 'right' | '';
  lastLocation: string;
  dryerSeverity: string;
  dryerNotes: string;
  alibi: string;
  witnesses: string;
  timeline: string;
  photoName: string;
  grief: number;
  swear: boolean;
  signature: string;
}

const initialState: FormState = {
  policy: '',
  colour: '',
  pattern: '',
  sentimentalValue: 50,
  side: '',
  lastLocation: '',
  dryerSeverity: '',
  dryerNotes: '',
  alibi: '',
  witnesses: '',
  timeline: '',
  photoName: '',
  grief: 5,
  swear: false,
  signature: '',
};

const dryerSeverities = ['Minor Lint Event', 'Moderate Tumble', 'Catastrophic Tumble'];

const submittingMessages = [
  'Stamping your claim...',
  'Waking the claims committee...',
  'Misplacing your affidavit...',
  'Finding your affidavit...',
];

type Phase = 'filling' | 'submitting' | 'submitted';

const money = (n: number) => `$${n.toFixed(2)}`;

export default function ClaimForm() {
  const [form, setForm] = React.useState<FormState>(initialState);
  const [activeStep, setActiveStep] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>('filling');
  const [messageIndex, setMessageIndex] = React.useState(0);
  const [reference, setReference] = React.useState('');

  const navigate = useNavigate();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Fake submission sequence
  React.useEffect(() => {
    if (phase !== 'submitting') return;
    const ticker = setInterval(
      () => setMessageIndex((i) => (i + 1) % submittingMessages.length),
      700,
    );
    const finish = setTimeout(() => setPhase('submitted'), 3200);
    return () => {
      clearInterval(ticker);
      clearTimeout(finish);
    };
  }, [phase]);

  // Fees: higher grief costs more
  const feeLines = [
    { label: 'Claim processing fee', amount: 14.99 },
    { label: 'Affidavit notarisation', amount: 4.99 },
    { label: `Grief handling surcharge (level ${form.grief})`, amount: form.grief * 0.5 },
  ];
  const totalFee = feeLines.reduce((sum, line) => sum + line.amount, 0);

  const handleSubmit = () => {
    setReference(`CLM-${Math.floor(100000 + Math.random() * 900000)}`);
    setMessageIndex(0);
    setPhase('submitting');
  };

  const handleReset = () => {
    setForm(initialState);
    setActiveStep(0);
    setPhase('filling');
    navigate("/")
  };

  const steps = [
    {
      label: 'Identify the sock',
      valid: form.colour.trim() !== '' && form.pattern.trim() !== '',
      content: (
        <>
          <TextField
            label="Policy Number"
            size="small"
            value={form.policy}
            onChange={(e) => set('policy', e.target.value)}
            fullWidth
          />
          <TextField
            label="Colour"
            size="small"
            value={form.colour}
            onChange={(e) => set('colour', e.target.value)}
            fullWidth
          />
          <TextField
            label="Pattern (stripes, dots, regret...)"
            size="small"
            value={form.pattern}
            onChange={(e) => set('pattern', e.target.value)}
            fullWidth
          />
          
          <Box>
            <Typography variant="body2" color="text.secondary">
              Sentimental value: {form.sentimentalValue}%
            </Typography>
            <Slider
              value={form.sentimentalValue}
              onChange={(_, v) => set('sentimentalValue', v as number)}
              valueLabelDisplay="auto"
            />
          </Box>
        </>
      ),
    },
    {
      label: 'Declare left or right',
      valid: form.side !== '',
      content: (
        <>
          <Typography variant="body2" color="text.secondary">
            Left and right socks are insured under separate policies.
          </Typography>
          <RadioGroup
            value={form.side}
            onChange={(e) => set('side', e.target.value as 'left' | 'right')}
          >
            <FormControlLabel value="left" control={<Radio />} label="Left sock" />
            <FormControlLabel value="right" control={<Radio />} label="Right sock" />
          </RadioGroup>
        </>
      ),
    },
    {
      label: 'Last known location',
      valid: form.lastLocation.trim() !== '',
      content: (
        <TextField
          label="Where did you last see it?"
          size="small"
          value={form.lastLocation}
          onChange={(e) => set('lastLocation', e.target.value)}
          fullWidth
        />
      ),
    },
    {
      label: 'Dryer incident report',
      valid: form.dryerSeverity !== '',
      content: (
        <>
          <TextField
            select
            label="Incident severity"
            size="small"
            value={form.dryerSeverity}
            onChange={(e) => set('dryerSeverity', e.target.value)}
            fullWidth
          >
            {dryerSeverities.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Describe the incident (optional)"
            size="small"
            multiline
            minRows={2}
            value={form.dryerNotes}
            onChange={(e) => set('dryerNotes', e.target.value)}
            fullWidth
          />
        </>
      ),
    },
    {
      label: 'Washing machine alibi',
      valid: form.alibi.trim() !== '',
      content: (
        <TextField
          label="Where was your washing machine at the time?"
          size="small"
          multiline
          minRows={2}
          value={form.alibi}
          onChange={(e) => set('alibi', e.target.value)}
          fullWidth
        />
      ),
    },
    {
      label: 'Witness statements',
      valid: form.witnesses.trim() !== '',
      content: (
        <>
          <Typography variant="body2" color="text.secondary">
            List the other socks present and what they saw.
          </Typography>
          <TextField
            label="Witness socks and statements"
            size="small"
            multiline
            minRows={3}
            value={form.witnesses}
            onChange={(e) => set('witnesses', e.target.value)}
            fullWidth
          />
        </>
      ),
    },
    {
      label: 'Forensic timeline',
      valid: form.timeline.trim() !== '',
      content: (
        <TextField
          label="Timeline of events"
          size="small"
          multiline
          minRows={3}
          placeholder="9:00 - sock last seen. 9:15 - drawer opened. 9:16 - sock gone."
          value={form.timeline}
          onChange={(e) => set('timeline', e.target.value)}
          fullWidth
        />
      ),
    },
    {
      label: 'Photo of the survivor',
      valid: form.photoName !== '',
      content: (
        <>
          <Typography variant="body2" color="text.secondary">
            Upload a photo of the sock that remains. Demo only: nothing is uploaded.
          </Typography>
          <Box>
            <Button variant="outlined" component="label">
              Choose photo
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => set('photoName', e.target.files?.[0]?.name ?? '')}
              />
            </Button>
            {form.photoName && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {form.photoName}
              </Typography>
            )}
          </Box>
        </>
      ),
    },
    {
      label: 'Rate your grief',
      valid: true,
      content: (
        <Box>
          <Typography variant="body2" color="text.secondary">
            1 is mild inconvenience, 10 is a candlelit vigil. Higher levels cost more to
            process.
          </Typography>
          <Slider
            value={form.grief}
            onChange={(_, v) => set('grief', v as number)}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Box>
      ),
    },
    {
      label: 'Sworn affidavit',
      valid: form.swear && form.signature.trim() !== '',
      content: (
        <>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.swear}
                onChange={(e) => set('swear', e.target.checked)}
              />
            }
            label="I solemnly swear this sock existed and is now missing"
          />
          <TextField
            label="Type your full name as signature"
            size="small"
            value={form.signature}
            onChange={(e) => set('signature', e.target.value)}
            fullWidth
          />
        </>
      ),
    },
    {
      label: 'Pay the claim processing fee',
      valid: true,
      content: (
        <Box>
          {feeLines.map((line) => (
            <Box
              key={line.label}
              sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}
            >
              <Typography variant="body2" color="text.secondary">
                {line.label}
              </Typography>
              <Typography variant="body2">{money(line.amount)}</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 700 }}>Due today</Typography>
            <Typography sx={{ fontWeight: 700 }}>{money(totalFee)}</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Your payout will be released once this fee has been paid. Payouts are capped
            at $1.50.
          </Typography>
        </Box>
      ),
    },
  ];

  const isLast = activeStep === steps.length - 1;

  if (phase === 'submitting') {
    return (
      <Paper variant="outlined" sx={{ maxWidth: 640, mx: 'auto', p: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Submitting your claim
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {submittingMessages[messageIndex]}
        </Typography>
      </Paper>
    );
  }

  if (phase === 'submitted') {
    return (
      <Paper variant="outlined" sx={{ maxWidth: 640, mx: 'auto', p: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Claim received
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Thank you, {form.signature}. We are sorry about your {form.side} {form.colour}{' '}
          {form.pattern} sock. A claims specialist will review your case within 90
          business days.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Policy Reference: {form.policy}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Claim Reference: {reference}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Fee of {money(totalFee)} is non-refundable, even if the sock turns up.
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleReset}>
          Home
        </Button>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ maxWidth: 640, mx: 'auto', p: { xs: 2, sm: 4 }, textAlign: 'left' }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        File a claim
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Eleven short steps. Please have your dryer incident report to hand.
      </Typography>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>{step.content}</Box>
              <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                <Button disabled={index === 0} onClick={() => setActiveStep((s) => s - 1)}>
                  Back
                </Button>
                {isLast ? (
                  <Button variant="contained" onClick={handleSubmit}>
                    Pay {money(totalFee)} and submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={!step.valid}
                    onClick={() => setActiveStep((s) => s + 1)}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}