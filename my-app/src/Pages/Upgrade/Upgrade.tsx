import Typography from '@mui/material/Typography';
import SelectActionCard from './Components/Cards';
import Button from '@mui/material/Button';
import { useState } from 'react';
import PaymentModal from './Components/Modal';
import { useNavigate } from 'react-router-dom';


export default function Upgrade() {
    const [selectedCard, setSelectedCard] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const setCard = (cardNum: number) => {
        console.log("Setting Selected Card:", cardNum);
        setSelectedCard(cardNum);
    }

    const clickButton = () => {
        setModalOpen(true);
    }

    const onClose = () => {
        setModalOpen(false);
        navigate("/")
    }

    return (
        <div style={{display: 'flex', alignContent: 'center', alignItems:"center", flexDirection:"column", gap:"20px"}}>
            <Typography variant="h4">Pick your Tier of coverage</Typography>
            <SelectActionCard selectedCard={selectedCard} setSelectedCard={setCard}/>
            <Button variant='contained' onClick={clickButton}>Purchase Selected Tier</Button>
            <PaymentModal optionId={selectedCard} onClose={onClose} open={modalOpen}/>
        </div>
        
        
    )
}