import { useDispatch, useSelector } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {  
  const anecdotes = useSelector(state => (
    state.anecdotes.filter(anecdote => (
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    ))
  ))

  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(voteOnAnecdote(anecdote))
    const message = `you voted on '${anecdote.content}'`
    dispatch(setNotification({ message, time: 5}))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleVote(anecdote)}
          />
        )}
    </div>
  )
}

export default AnecdoteList