const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h3>{anecdote.content}</h3>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote
