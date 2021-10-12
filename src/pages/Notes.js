import React , { useEffect,useState } from 'react'
import {Grid,Paper,Container} from '@material-ui/core'

export default function Notes() {
  const [notes, setNotes] = useState([])  

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        console.log('data',data)
        setNotes(data)
      })
   
  }, [])

  return (
    <Container>
      Notes page
      <Grid container>
      {notes.map(note => (
          <Grid item xs={12} md={6} lg={4} key={note.id}>
            <Paper>{note.title}</Paper>
          </Grid>
        ))}
      </Grid>
    </Container>

  )
}
