import { useContext, useEffect } from 'react';
import { TableContext } from '../context/TableProvider';
import logoImg from '../images/logo-star-wars.png';
import grafismoImg from '../images/grafismo-topo.png';
import SecondRowFiltersOptions from './SecondRowFiltersOptions';
import FirstRowFiltersOptions from './FirstRowFiltersOptions';
import TableHead from './TableHead';

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
      <div className="table_and_filters_container">
        <div className="filters_container">
          <div className="first_row_filters_options_container">
            <FirstRowFiltersOptions />
          </div>
          <div className="second_row_filters_options_container">
            <SecondRowFiltersOptions />
          </div>
          <div
            className={
              filterList.length === 0
                ? 'hidden_filters_container'
                : 'show_filters_container'
            }
          >
            {filterList.map((filterSelected) => (
              <div
                className="filter_container"
                key={ filterSelected.column }
                data-testid="filter"
              >
                <p className="filter_text">{filterSelected.column}</p>
                <p className="filter_text">{filterSelected.comparison}</p>
                <p className="filter_text">{filterSelected.value}</p>
                <button
                  className="filter_button"
                  onClick={ () => handleRemoveFilter(filterSelected) }
                >
                  X
                </button>
              </div>
            ))}
            <button
              className="button_remove_filters"
              data-testid="button-remove-filters"
              type="button"
              onClick={ handleRemoveAllFilters }
            >
              Remover Filtros
            </button>
          </div>
        </div>

        <div className="table_container">
          <table>
            <TableHead />
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
      </div>
    </>
  );
}
