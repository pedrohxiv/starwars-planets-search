import { useEffect, useState } from 'react';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('https://swapi.dev/api/planets');
      const { results } = await resp.json();
      const planetsList = results.map((result) => {
        const { residents, ...planet } = result;
        return planet;
      });
      setPlanets(planetsList);
    };
    fetchData();
  }, []);

  const handleFilter = () => {
    setFilterByNumericValues([
      ...filterByNumericValues,
      {
        column: filter.column,
        comparison: filter.comparison,
        value: filter.value,
      },
    ]);
    if (planetsFiltered.length === 0) {
      setPlanetsFiltered(
        planets.filter((planet) => {
          if (filter.comparison === 'maior que') {
            return +planet[filter.column] > +filter.value;
          }
          if (filter.comparison === 'menor que') {
            return +planet[filter.column] < +filter.value;
          }
          return +planet[filter.column] === +filter.value;
        }),
      );
    } else {
      setPlanetsFiltered(
        planetsFiltered.filter((planet) => {
          if (filter.comparison === 'maior que') {
            return +planet[filter.column] > +filter.value;
          }
          if (filter.comparison === 'menor que') {
            return +planet[filter.column] < +filter.value;
          }
          return +planet[filter.column] === +filter.value;
        }),
      );
    }
    setFilter({
      name: '',
      column: 'population',
      comparison: 'maior que',
      value: '0',
    });
  };

  const columnFiltersOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ filter.name }
          onChange={ ({ target }) => {
            setFilter({ ...filter, name: target.value });
            setPlanetsFiltered([]);
          } }
        />
      </div>
      <div>
        <label htmlFor="column-filter">
          Columns
          <select
            name="column-filter"
            id="column-filter"
            value={ filter.column }
            data-testid="column-filter"
            onChange={ ({ target }) => setFilter({ ...filter, column: target.value }) }
          >
            {filterByNumericValues.length === 0
              ? columnFiltersOptions.map((columnFilter) => (
                <option key={ columnFilter } value={ `${columnFilter}` }>
                  {columnFilter}
                </option>
              ))
              : columnFiltersOptions
                .filter(
                  (columnFiltersOption) => !filterByNumericValues
                    .map((filterByNumericValue) => filterByNumericValue.column)
                    .includes(columnFiltersOption),
                )
                .map((columnFilter) => (
                  <option key={ columnFilter } value={ `${columnFilter}` }>
                    {columnFilter}
                  </option>
                ))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador
          <select
            name="comparison-filter"
            id="comparison-filter"
            value={ filter.comparison }
            data-testid="comparison-filter"
            onChange={ ({ target }) => (
              setFilter({ ...filter, comparison: target.value })) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          value={ filter.value }
          onChange={ ({ target }) => setFilter({ ...filter, value: target.value }) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilter }
        >
          Filtrar
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetsFiltered.length === 0
            ? planets
              .filter(({ name }) => name.includes(filter.name))
              .map((planet) => (
                <tr key={ planet.name }>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))
            : planetsFiltered.map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
