function Movie({ coverImg, title, summary, genres, key }) {
  return (
    <div key={key}>
      <img src={coverImg} alt="img" />
      <h2>{title}</h2>
      <p>{summary}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

export default Movie;
