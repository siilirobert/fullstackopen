import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getNotes, creatNote, updateNote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation(creatNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData('notes')
      queryClient.setQueryData('notes', notes.concat(newNote))
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  const updateNoteMuatation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    }
  })

  const toggleImportance = (note) => {
    updateNoteMuatation.mutate({ ...note, important: !note.important })
  }

  const result = useQuery('notes', getNotes, { refetchOnWindowFocus: false })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App