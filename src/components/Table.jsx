import { useContext, useEffect } from 'react';
import { TableContext } from '../context/TableProvider';

export default function Table() {
  const {
    setDefaultPlanets,
    planets,
    setPlanets,
    filterOptions,
    filter,
    setFilter,
    filterList,
    order,
    setOrder,
    handleFilter,
    handleRemoveFilter,
    handleRemoveAllFilters,
    handleSort,
  } = useContext(TableContext);

  useEffect(() => {
    const fetchPlanets = async () => {
      const resp = await fetch('https://swapi.dev/api/planets');
      const { results } = await resp.json();
      const fetchedPlanetsList = results.map((result) => {
        const { residents, ...planet } = result;
        return planet;
      });
      setDefaultPlanets(fetchedPlanetsList);
      setPlanets(fetchedPlanetsList);
    };
    fetchPlanets();
  }, [setDefaultPlanets, setPlanets]);

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ filter.name }
          onChange={ ({ target }) => setFilter({ ...filter, name: target.value }) }
        />
      </div>
      <div>
        <label htmlFor="column-filter">
          Columns
          <select
            name="column-filter"
            id="column-filter"
            data-testid="column-filter"
            onChange={ ({ target }) => setFilter({ ...filter, column: target.value }) }
          >
            {filterOptions.map((filterOption) => (
              <option key={ filterOption } value={ filterOption }>
                {filterOption}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador
          <select
            name="comparison-filter"
            id="comparison-filter"
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
        <select
          name="column-sort"
          id="column-sort"
          data-testid="column-sort"
          onChange={ ({ target }) => setOrder({ ...order, column: target.value }) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="column-sort-input-asc">
          ASC
          <input
            type="radio"
            id="column-sort-input-asc"
            data-testid="column-sort-input-asc"
            value="ASC"
            checked={ order.sort === 'ASC' }
            onChange={ () => setOrder({ ...order, sort: 'ASC' }) }
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          DESC
          <input
            type="radio"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            value="DESC"
            checked={ order.sort === 'DESC' }
            onChange={ () => setOrder({ ...order, sort: 'DESC' }) }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          Ordenar
        </button>
        <div>
          {filterList.map((filterSelected) => (
            <div key={ filterSelected.column } data-testid="filter">
              <p>{filterSelected.comparison}</p>
              <p>{filterSelected.value}</p>
              <p>{filterSelected.column}</p>
              <button onClick={ () => handleRemoveFilter(filterSelected) }>
                X
              </button>
            </div>
          ))}
          <button
            data-testid="button-remove-filters"
            type="button"
            onClick={ handleRemoveAllFilters }
          >
            Remover Filtros
          </button>
        </div>
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
          {planets
            .filter(({ name }) => name.includes(filter.name))
            .map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{planet.name}</td>
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
