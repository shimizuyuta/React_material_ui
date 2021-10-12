import React,{useState} from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import AccessibleIcon from '@material-ui/icons/Accessible';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Radio from '@material-ui/core/Radio';
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel,FormControl,FormLabel } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  btn:{
    fontSize:20,
    backgroundColor:'black',
    '&:hover':{
      backgroundColor:'red'
    }
  },
  title:{
    textDecoration:'underline',
    marginBottom:20,
  },
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }
})

export default function Create() {
  const classes = useStyles();
  const [title,setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError,setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('todos')
  const history = useHistory

  const handleSubmit = (e) =>{
    e.preventDefault()
    setDetailsError(false);
    setTitleError(false);
    
    if(title ==''){
      setTitleError(true)
    }
    if(details ==''){
      setDetailsError(true)
    }
    console.log('e',e)
    if(title && details){
      fetch('http://localhost:8000/notes',{
        method:'post',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({title,details,category})
      })
      .then(()=>history.push('/'))
    }
  }


  return (
    <Container>
      <Typography
        className={classes.title}
        variant="h6"
        color="textPrimary"
        component="h2"
        gutterBottom
      >
        create a new Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e)=> setDetails(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        ></TextField>

        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        ></TextField>
        <FormControl className={classes.field}>
          <FormLabel>note Category</FormLabel>
          <RadioGroup value={category} onChange={(e)=> setCategory(e.target.value)}>
            <FormControlLabel control={<Radio/>} value ="money" label="Money"/>
            <FormControlLabel control={<Radio/>} value ="todos" label="Todos"/>
            <FormControlLabel control={<Radio/>} value ="reminders" label="Reminders"/>
            <FormControlLabel control={<Radio/>} value ="work" label="Work"/>
          </RadioGroup>
        </FormControl>

        <Button
          className={classes.btn}
          type="submit"
          color="secondary"
          variant="contained"
          startIcon={<AccessibleIcon></AccessibleIcon>}
        >submit
        </Button>
      </form>

     
    </Container>
  )
}
