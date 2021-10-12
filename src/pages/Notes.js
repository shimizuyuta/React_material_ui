import React , { useEffect,useState } from 'react'
import {Grid,Paper,Container} from '@material-ui/core'
import NoteCard from '../components/NoteCard'

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

  const handleDelete = async(id) =>{
    await fetch('http://localhost:8000/notes/' + id,{
      method:'delete'
    })
    const newNotes = notes.filter(note =>note.id != id)
    setNotes(newNotes)
  }

  return (
    <Container>
      Notes page
      <Grid container spacing={3}>
      {notes.map(note => (
          <Grid item xs={12} md={6} lg={4} key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </Grid>
        ))}
      </Grid>
    </Container>

  )
}
