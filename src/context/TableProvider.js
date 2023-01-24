import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TableContext = createContext();

export default function TableProvider({ children }) {
  const [defaultPlanets, setDefaultPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [filterOptions, setFilterOptions] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [filter, setFilter] = useState(
    { name: '', column: filterOptions[0], comparison: 'maior que', value: '0' },
  );
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  const handleFilter = () => {
    setFilterList([
      ...filterList,
      {
        column: filter.column,
        comparison: filter.comparison,
        value: filter.value,
      },
    ]);
    setFilterOptions(
      filterOptions.filter((filterOption) => filterOption !== filter.column),
    );
    setPlanets(
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
    setFilter({
      ...filter,
      column: filterOptions[0],
    });
  };

  const handleRemoveFilter = (filterToRemove) => {
    const changedFilterList = filterList.filter(
      (filterSelected) => filterSelected !== filterToRemove,
    );
    let filteredPlanets = defaultPlanets;
    changedFilterList.forEach(({ comparison, column, value }) => {
      filteredPlanets = filteredPlanets.filter((planet) => {
        if (comparison === 'maior que') {
          return +planet[column] > +value;
        }
        if (comparison === 'menor que') {
          return +planet[column] < +value;
        }
        return +planet[column] === +value;
      });
    });
    setFilterList(changedFilterList);
    setFilterOptions([...filterOptions, filterToRemove.column]);
    setPlanets(filteredPlanets);
  };

  const handleRemoveAllFilters = () => {
    setFilterList([]);
    setFilterOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setPlanets(defaultPlanets);
  };

  const handleSort = () => {
    if (order.column === 'surface_water' || order.column === 'population') {
      if (order.sort === 'ASC') {
        setPlanets([
          ...planets
            .filter((planet) => planet[order.column] !== 'unknown')
            .sort((a, b) => a[order.column] - b[order.column]),
          ...planets.filter((planet) => planet[order.column] === 'unknown'),
        ]);
        setOrder({
          column: 'population',
          sort: 'ASC',
        });
      }
      if (order.sort === 'DESC') {
        setPlanets([
          ...planets
            .filter((planet) => planet[order.column] !== 'unknown')
            .sort((a, b) => b[order.column] - a[order.column]),
          ...planets.filter((planet) => planet[order.column] === 'unknown'),
        ]);
        setOrder({
          column: 'population',
          sort: 'ASC',
        });
      }
    }
    if (order.column !== 'surface_water' && order.column !== 'population') {
      if (order.sort === 'ASC') {
        setPlanets(planets.sort((a, b) => a[order.column] - b[order.column]));
        setOrder({
          column: 'population',
          sort: 'ASC',
        });
      }
      if (order.sort === 'DESC') {
        setPlanets(planets.sort((a, b) => b[order.column] - a[order.column]));
        setOrder({
          column: 'population',
          sort: 'ASC',
        });
      }
    }
  };

  return (
    <TableContext.Provider
      value={ {
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
      } }
    >
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
