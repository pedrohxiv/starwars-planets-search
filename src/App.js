import Table from './components/Table';
import TableProvider from './context/TableProvider';
import './App.css';

export default function App() {
  return (
    <div>
      <TableProvider>
        <Table />
      </TableProvider>
    </div>
  );
}
