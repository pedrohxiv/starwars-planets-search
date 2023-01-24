import { useContext } from 'react';
import { TableContext } from '../context/TableProvider';
import iconSearch from '../images/icon-search.png';

export default function FirstRowFiltersOptions() {
  const { filter, setFilter } = useContext(TableContext);

  return (
    <>
      <input
        className="name_filter"
        type="text"
        data-testid="name-filter"
        value={ filter.name }
        onChange={ ({ target }) => setFilter({ ...filter, name: target.value }) }
      />

      <img className="icon_search" src={ iconSearch } alt="Icon Search" />
    </>
  );
}
