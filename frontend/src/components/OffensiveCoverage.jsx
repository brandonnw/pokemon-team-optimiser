function OffensiveCoverage({ offensiveCoverage }) {
  if (!offensiveCoverage) return null;

  const covered = offensiveCoverage.filter((item) => item.covered);
  const notCovered = offensiveCoverage.filter((item) => !item.covered);

  return (
    <section>
      <h2>Offensive Coverage</h2>

      <p>
        Covered {covered.length} / {offensiveCoverage.length} types
      </p>

      <h3>Coverage Gaps</h3>

      {notCovered.length === 0 ? (
        <p>Your team has super-effective coverage against every type.</p>
      ) : (
        <ul>
          {notCovered.map((item) => (
            <li key={item.defendingType}>{item.defendingType}</li>
          ))}
        </ul>
      )}

      <h3>Covered Types</h3>

      <ul>
        {covered.map((item) => (
          <li key={item.defendingType}>
            <strong>{item.defendingType}</strong> — covered by{" "}
            {item.attackingOptions
              .map((option) => `${option.pokemon} (${option.attackingType})`)
              .join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default OffensiveCoverage;