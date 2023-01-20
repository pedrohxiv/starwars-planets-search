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
    setFilter({ ...filter, name: '' });
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
  };

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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
                  <th>{planet.name}</th>
                  <th>{planet.rotation_period}</th>
                  <th>{planet.orbital_period}</th>
                  <th>{planet.diameter}</th>
                  <th>{planet.climate}</th>
                  <th>{planet.gravity}</th>
                  <th>{planet.terrain}</th>
                  <th>{planet.surface_water}</th>
                  <th>{planet.population}</th>
                  <th>{planet.films}</th>
                  <th>{planet.created}</th>
                  <th>{planet.edited}</th>
                  <th>{planet.url}</th>
                </tr>
              ))
            : planetsFiltered.map((planet) => (
              <tr key={ planet.name }>
                <th>{planet.name}</th>
                <th>{planet.rotation_period}</th>
                <th>{planet.orbital_period}</th>
                <th>{planet.diameter}</th>
                <th>{planet.climate}</th>
                <th>{planet.gravity}</th>
                <th>{planet.terrain}</th>
                <th>{planet.surface_water}</th>
                <th>{planet.population}</th>
                <th>{planet.films}</th>
                <th>{planet.created}</th>
                <th>{planet.edited}</th>
                <th>{planet.url}</th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
