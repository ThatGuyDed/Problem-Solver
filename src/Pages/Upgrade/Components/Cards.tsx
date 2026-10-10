import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { cards } from './CardData';
import SockImage from './SockImage';


interface SelectActionCardProps {
  selectedCard: number;
  setSelectedCard: (value: number) => void;
}

function SelectActionCard( {selectedCard, setSelectedCard}: SelectActionCardProps) {

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1500,
        mx: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 400px))',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id} sx={{ height: '100%' }}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              '&[data-active]': {
                backgroundColor: (theme) =>
                  theme.palette.secondary.main,
              },
            }}
          >
            <CardContent>
              <SockImage title={card.title} />
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              {card.description.map((text)=> (
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    {text}
                </Typography>
              )

              )}
              
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;