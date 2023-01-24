import { useContext, useEffect } from 'react';
import { TableContext } from '../context/TableProvider';
import logoImg from '../images/logo-star-wars.png';
import grafismoImg from '../images/grafismo-topo.png';
import SecondRowFiltersOptions from './SecondRowFiltersOptions';
import FirstRowFiltersOptions from './FirstRowFiltersOptions';

export default function Table() {
  const {
    setDefaultPlanets,
    planets,
    setPlanets,
    filter,
    filterList,
    handleRemoveFilter,
    handleRemoveAllFilters,
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
    <>
      <div className="image_container">
        <img src={ logoImg } alt="Logo StarWars" className="image_logo" />
        <img
          src={ grafismoImg }
          alt="Grafismo da Logo StarWars"
          className="image_graphism"
        />
      </div>
      <div className="table_container">
        <div className="filters_container">
          <div className="first_row_filters_options_container">
            <FirstRowFiltersOptions />
          </div>
          <div className="second_row_filters_options_container">
            <SecondRowFiltersOptions />
          </div>
          <div
            style={
              filterList.length === 0
                ? { display: 'none' }
                : { display: 'inline' }
            }
          >
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
              {[
                'Name',
                'Rotation Period',
                'Orbital Period',
                'Diameter',
                'Climate',
                'Gravity',
                'Terrain',
                'Surface Water',
                'Population',
                'Films',
                'Created',
                'Edited',
                'URL',
              ].map((tableHead) => (
                <th key={ tableHead }>{tableHead}</th>
              ))}
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
    </>
  );
}
