function OffensiveCoverage({ offensiveCoverage }) {
  if (!offensiveCoverage) return null;

  const covered = offensiveCoverage.filter((item) => item.covered);
  const notCovered = offensiveCoverage.filter((item) => !item.covered);

  const coveragePercent = Math.round(
    (covered.length / offensiveCoverage.length) * 100
  );

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="section-kicker">Attack Profile</p>
          <h2>Offensive Coverage</h2>
        </div>

        <div className="coverage-score">
          <span>{coveragePercent}%</span>
          <small>{covered.length}/{offensiveCoverage.length} covered</small>
        </div>
      </div>

      <div className="coverage-meter">
        <div
          className="coverage-meter-fill"
          style={{ width: `${coveragePercent}%` }}
        />
      </div>

      <div className="coverage-block">
        <h3>Coverage Gaps</h3>

        {notCovered.length === 0 ? (
          <p className="empty-text">
            Your team has super-effective coverage against every type.
          </p>
        ) : (
          <div className="type-pill-wrap">
            {notCovered.map((item) => (
              <span
                key={item.defendingType}
                className={`type-badge type-glow-${item.defendingType}`}
              >
                {item.defendingType}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="coverage-block">
        <h3>Strong Coverage</h3>

        <div className="coverage-list">
          {covered.map((item) => (
            <div
              key={item.defendingType}
              className={`coverage-row type-glow-${item.defendingType}`}
            >
              <span className="coverage-type">{item.defendingType}</span>

              <span className="coverage-detail">
                {item.attackingOptions
                  .map((option) => `${option.pokemon} (${option.attackingType})`)
                  .join(", ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OffensiveCoverage;