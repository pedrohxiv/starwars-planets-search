import { useContext } from 'react';
import { TableContext } from '../context/TableProvider';

export default function SecondRowFiltersOptions() {
  const {
    filterOptions,
    filter,
    setFilter,
    order,
    setOrder,
    handleFilter,
    handleSort,
  } = useContext(TableContext);

  return (
    <>
      <label htmlFor="column-filter" className="column_filter_label">
        Columns
        <select
          className="column_filter_select"
          name="column-filter"
          id="column-filter"
          data-testid="column-filter"
          onChange={ ({ target }) => setFilter({ ...filter, column: target.value }) }
        >
          {filterOptions.map((filterOption) => (
            <option
              className="column_filter_option"
              key={ filterOption }
              value={ filterOption }
            >
              {filterOption}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter" className="comparison_filter_label">
        Operador
        <select
          className="comparison_filter_select"
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ ({ target }) => setFilter({ ...filter, comparison: target.value }) }
        >
          {['maior que', 'menor que', 'igual a'].map((comparisonOption) => (
            <option
              className="comparison_filter_option"
              key={ comparisonOption }
              value={ comparisonOption }
            >
              {comparisonOption}
            </option>
          ))}
        </select>
      </label>
      <input
        className="value_filter_input"
        type="number"
        data-testid="value-filter"
        value={ filter.value }
        onChange={ ({ target }) => setFilter({ ...filter, value: target.value }) }
      />
      <button
        className="button_filter"
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
      <label htmlFor="column-sort" className="column_sort_label">
        Ordenar

        <select
          className="column_sort_select"
          name="column-sort"
          id="column-sort"
          data-testid="column-sort"
          onChange={ ({ target }) => setOrder({ ...order, column: target.value }) }
        >
          <option className="column_sort_option" value="population">
            population
          </option>
          <option className="column_sort_option" value="orbital_period">
            orbital_period
          </option>
          <option className="column_sort_option" value="diameter">
            diameter
          </option>
          <option className="column_sort_option" value="rotation_period">
            rotation_period
          </option>
          <option className="column_sort_option" value="surface_water">
            surface_water
          </option>
        </select>
      </label>
      <div className="column_sort_inputs_container">
        <label htmlFor="column-sort-input-asc" className="column_sort_input_asc_label">
          <input
            className="column_sort_input_asc"
            type="radio"
            id="column-sort-input-asc"
            data-testid="column-sort-input-asc"
            value="ASC"
            checked={ order.sort === 'ASC' }
            onChange={ () => setOrder({ ...order, sort: 'ASC' }) }
          />
          Ascendente
        </label>
        <label htmlFor="column-sort-input-desc" className="column_sort_input_desc_label">
          <input
            className="column_sort_input_desc"
            type="radio"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            value="DESC"
            checked={ order.sort === 'DESC' }
            onChange={ () => setOrder({ ...order, sort: 'DESC' }) }
          />
          Descendente
        </label>
      </div>
      <button
        className="column_sort_button"
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Ordenar
      </button>
    </>
  );
}
