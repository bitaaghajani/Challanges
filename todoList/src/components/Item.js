import { Container, Card, CardContent, CardActions, Typography, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useStore from '../stores/useStore';
export default function Item({ deleteItem, editItem}) {
    const{
        items,
        filterItems,
        searchActive
    }=useStore(state=>state)
    const resultItems=searchActive? filterItems : items;
    return (
        <Container maxWidth='sm' sx={{
            display: 'flex', flexDirection: 'column',
            gap: '1.5rem',
            mt: '2rem'
        }}>

            {resultItems.length ===0  && <Typography sx={{textAlign:"center"}}>nothing shows</Typography>}
            {resultItems.length >0 && resultItems.map(item => (<Card align='center' variant='outstylined' sx={{
                backgroundColor: '#53c4f7',
                padding: '1rem',
                textTransform: 'capitalize'
            }}>
                <Typography variant='h6' component='h5' >
                    here what you should do...
                </Typography>
                <CardContent>
                    <Typography key={item.id} variant="body1">
                        {item.value}
                    </Typography>
                    <Typography variant="body1" sx={{mt:'1rem'}}>
                        {item.date}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton onClick={() => deleteItem(item.id)} type='click'>
                        <DeleteIcon color='error' />
                    </IconButton>
                    <IconButton onClick={() => editItem(item.id)} type='submit'>
                        <EditIcon color='success' />
                    </IconButton>
                </CardActions>
            </Card>))}
        </Container>
    )
}

