import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const stats = [
  { value: '4.2 billion', label: 'socks vanish every year' },
  { value: '73%', label: 'of customers report feeling "incomplete"' },
  { value: '11', label: 'steps to a claim, for your protection' },
  { value: '0.3%', label: 'of claims have ever been fully paid out' },
];

const steps = [
  {
    title: 'Insure your socks',
    body: 'Left and right socks are covered by separate policies, because they are separate people.',
  },
  {
    title: 'Lose one',
    body: 'It will happen. Our actuaries say it is "not a question of if, but of when, and which one."',
  },
  {
    title: 'File your claim',
    body: 'Complete our streamlined 11-step form. Please have your dryer incident report and a sworn affidavit ready.',
  },
  {
    title: 'Pay to be reimbursed',
    body: 'A small processing fee unlocks your payout. The fee is processed by our processing department, for a processing fee.',
  },
];

const testimonials = [
  {
    quote:
      'I lost my sock and it felt like I lost my soul. What is it called? sock- socksure saved my life, I felt found',
    name: 'Luke D.',
    detail: 'Avid sock lover',
  },
  {
    quote:
      "I made SockSure to help those in need, I was always losing my socks. Thanks to SockSure even though I don't have them back I at least know where they are",
    name: 'Mal C.',
    detail: 'Founder',
  },
  {
    quote:
      'The sock therapist was really useful when all I had was odd right socks.',
    name: 'Chloe R.',
    detail: 'Number #1 Policy user',
  }
];

export default function Home() {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', textAlign: 'center' }}>
      {/* Hero */}
      <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
          Lose a sock.
          <br />
          Not your composure.
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mt: 3, maxWidth: 640, mx: 'auto', fontWeight: 400 }}
        >
          SockSure Galactic™ is the world's first comprehensive missing sock insurance
          platform. Every sole deserves a soulmate, and every soulmate deserves a claims
          process.
        </Typography>
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/claim"
          >
            File a claim
          </Button>
          <Button
            variant="contained"
            color='secondary'
            size="large"
            component={RouterLink}
            to="/upgrade"
          >
            See pricing
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Free tier covers one sock, left foot only. Claims may take up to 90 days to
          begin.
        </Typography>
      </Box>

      <Divider />

      {/* Stats */}
      <Box
        sx={{
          py: 6,
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
        }}
      >
        {stats.map((s) => (
          <Box key={s.label}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {s.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {s.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider />

      {/* How it works */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          How it works
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Four simple steps. Eleven, if you count the claim form.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          }}
        >
          {steps.map((step, i) => (
            <Card key={step.title} variant="outlined">
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  Step {i + 1}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {step.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {step.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Galactic section */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
          Protection that reaches beyond your sock drawer
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 680, mx: 'auto' }}>
          Our SockSat constellation is being designed to track every sock on Earth in real
          time. Phase 4 extends coverage to the Martian laundromat network, because
          wherever humanity goes, so will the dryer. Our long-term mission is Universal
          Sock Reconciliation: a world where no sock is ever alone.
        </Typography>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          color='primary'
          component={RouterLink}
          to="/tracker"
        >
          Visit the SockSat Tracker
        </Button>
      </Box>

      <Divider />

      {/* Testimonials */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 4 }}>
          Trusted by people who have lost things
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          }}
        >
          {testimonials.map((t) => (
            <Card key={t.name} variant="outlined">
              <CardContent>
                <Typography sx={{ mb: 2 }}>"{t.quote}"</Typography>
                <Typography variant="subtitle2">{t.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {t.detail}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Closing CTA + fine print */}
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
          Your socks are out there.
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Make sure you are covered when they decide to leave.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color='secondary'
          component={RouterLink}
          to="/upgrade"
        >
          Get covered
        </Button>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', pb: 4 }}
      >
        SockSure Galactic is a parody project and is not a real insurance product. No socks
        were harmed, though several remain unaccounted for. Statistics are fictional.
        Matching Pair Guarantee™ does not guarantee a match, a pair, or a guarantee.
      </Typography>
    </Box>
  );
}