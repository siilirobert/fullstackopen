const Languages = ({ languages }) => {
  return (
    <>
      <p><strong>languages:</strong></p>
      <ul>
        {Object.values(languages).map((language) =>
          <li key={language}>{language}</li>
        )}
      </ul>
    </>
  )
}

export default Languages
