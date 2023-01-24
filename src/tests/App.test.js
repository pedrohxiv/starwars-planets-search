import React from "react";
import { act, render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import testData from "./mocks/testData";

test("Verifica se tabela é atualizada com os planetas que se encaixam no filtro à medida que o nome é digitado, sem ter que apertar em um botão para efetuar a filtragem", async () => {
  jest.spyOn(global, "fetch");
  global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  await act(async () => render(<App />));

  const nameFilterEl = screen.getByTestId(/name-filter/i);
  expect(nameFilterEl).toBeInTheDocument();
  const columnFilterEl = screen.getByTestId(/column-filter/i);
  expect(columnFilterEl).toBeInTheDocument();
  const comparisonFilterEl = screen.getByTestId(/comparison-filter/i);
  expect(comparisonFilterEl).toBeInTheDocument();
  const valueFilterEl = screen.getByTestId(/value-filter/i);
  expect(valueFilterEl).toBeInTheDocument();
  const buttonFilterEl = screen.getByTestId(/button-filter/i);
  expect(buttonFilterEl).toBeInTheDocument();

  userEvent.type(nameFilterEl, "o");
  [
    "Tatooine",
    "Hoth",
    "Dagobah",
    "Endor",
    "Naboo",
    "Coruscant",
    "Kamino",
  ].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
  userEvent.clear(nameFilterEl);

  userEvent.type(nameFilterEl, "oo");
  ["Tatooine", "Naboo"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
  userEvent.clear(nameFilterEl);

  userEvent.type(nameFilterEl, "o");
  [
    "Tatooine",
    "Hoth",
    "Dagobah",
    "Endor",
    "Naboo",
    "Coruscant",
    "Kamino",
  ].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
  userEvent.type(nameFilterEl, "o");
  ["Tatooine", "Naboo"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
});

test("Verifica se ao clicar somente uma vez no botão, deve filtrar os dados da tabela de acordo com a coluna correspondente e com os valores escolhidos", async () => {
  jest.spyOn(global, "fetch");
  global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  await act(async () => render(<App />));

  const nameFilterEl = screen.getByTestId(/name-filter/i);
  expect(nameFilterEl).toBeInTheDocument();
  const columnFilterEl = screen.getByTestId(/column-filter/i);
  expect(columnFilterEl).toBeInTheDocument();
  const comparisonFilterEl = screen.getByTestId(/comparison-filter/i);
  expect(comparisonFilterEl).toBeInTheDocument();
  const valueFilterEl = screen.getByTestId(/value-filter/i);
  expect(valueFilterEl).toBeInTheDocument();
  const buttonFilterEl = screen.getByTestId(/button-filter/i);
  expect(buttonFilterEl).toBeInTheDocument();

  userEvent.selectOptions(columnFilterEl, "orbital_period");
  userEvent.selectOptions(comparisonFilterEl, "igual a");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "402");
  userEvent.click(buttonFilterEl);
  expect(screen.getAllByRole("row")[1]).toHaveTextContent(/Endor/i);
});

test("Verifica se ao clicar 2 vezes no botão, selecionando 2 filtros diferentes, deve filtrar os dados da tabela de acordo com a coluna correspondente e com os valores escolhidos", async () => {
  jest.spyOn(global, "fetch");
  global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  await act(async () => render(<App />));

  const nameFilterEl = screen.getByTestId(/name-filter/i);
  expect(nameFilterEl).toBeInTheDocument();
  const columnFilterEl = screen.getByTestId(/column-filter/i);
  expect(columnFilterEl).toBeInTheDocument();
  const comparisonFilterEl = screen.getByTestId(/comparison-filter/i);
  expect(comparisonFilterEl).toBeInTheDocument();
  const valueFilterEl = screen.getByTestId(/value-filter/i);
  expect(valueFilterEl).toBeInTheDocument();
  const buttonFilterEl = screen.getByTestId(/button-filter/i);
  expect(buttonFilterEl).toBeInTheDocument();

  userEvent.selectOptions(columnFilterEl, "orbital_period");
  userEvent.selectOptions(comparisonFilterEl, "menor que");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "400");
  userEvent.click(buttonFilterEl);
  ["Tatooine", "Alderaan", "Dagobah", "Naboo", "Coruscant"].forEach(
    (name, index) => {
      expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(
        `${name}`
      );
    }
  );
  userEvent.selectOptions(columnFilterEl, "diameter");
  userEvent.selectOptions(comparisonFilterEl, "maior que");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "12000");
  userEvent.click(buttonFilterEl);
  ["Alderaan", "Naboo", "Coruscant"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
});

test("Verifica se ao clicar 3 vezes no botão, selecionando 3 filtros diferentes, deve filtrar os dados da tabela de acordo com a coluna correspondente e com os valores escolhidos", async () => {
  jest.spyOn(global, "fetch");
  global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  await act(async () => render(<App />));

  const nameFilterEl = screen.getByTestId(/name-filter/i);
  expect(nameFilterEl).toBeInTheDocument();
  const columnFilterEl = screen.getByTestId(/column-filter/i);
  expect(columnFilterEl).toBeInTheDocument();
  const comparisonFilterEl = screen.getByTestId(/comparison-filter/i);
  expect(comparisonFilterEl).toBeInTheDocument();
  const valueFilterEl = screen.getByTestId(/value-filter/i);
  expect(valueFilterEl).toBeInTheDocument();
  const buttonFilterEl = screen.getByTestId(/button-filter/i);
  expect(buttonFilterEl).toBeInTheDocument();

  userEvent.selectOptions(columnFilterEl, "diameter");
  userEvent.selectOptions(comparisonFilterEl, "maior que");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "11000");
  userEvent.click(buttonFilterEl);
  ["Alderaan", "Bespin", "Naboo", "Coruscant", "Kamino"].forEach(
    (name, index) => {
      expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(
        `${name}`
      );
    }
  );
  userEvent.selectOptions(columnFilterEl, "orbital_period");
  userEvent.selectOptions(comparisonFilterEl, "menor que");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "500");
  userEvent.click(buttonFilterEl);
  ["Alderaan", "Naboo", "Coruscant", "Kamino"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
  userEvent.selectOptions(columnFilterEl, "rotation_period");
  userEvent.selectOptions(comparisonFilterEl, "igual a");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "27");
  userEvent.click(buttonFilterEl);
  ["Kamino"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
});

test("Verifica se remover um filtro os dados da tabela ficam  corretos de acordo com os filtros restantes", async () => {
  jest.spyOn(global, "fetch");
  global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  await act(async () => render(<App />));

  const nameFilterEl = screen.getByTestId(/name-filter/i);
  expect(nameFilterEl).toBeInTheDocument();
  const columnFilterEl = screen.getByTestId(/column-filter/i);
  expect(columnFilterEl).toBeInTheDocument();
  const comparisonFilterEl = screen.getByTestId(/comparison-filter/i);
  expect(comparisonFilterEl).toBeInTheDocument();
  const valueFilterEl = screen.getByTestId(/value-filter/i);
  expect(valueFilterEl).toBeInTheDocument();
  const buttonFilterEl = screen.getByTestId(/button-filter/i);
  expect(buttonFilterEl).toBeInTheDocument();

  userEvent.selectOptions(columnFilterEl, "diameter");
  userEvent.selectOptions(comparisonFilterEl, "maior que");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "11000");
  userEvent.click(buttonFilterEl);
  ["Alderaan", "Bespin", "Naboo", "Coruscant", "Kamino"].forEach(
    (name, index) => {
      expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(
        `${name}`
      );
    }
  );
  userEvent.selectOptions(columnFilterEl, "orbital_period");
  userEvent.selectOptions(comparisonFilterEl, "menor que");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "500");
  userEvent.click(buttonFilterEl);
  ["Alderaan", "Naboo", "Coruscant", "Kamino"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
  userEvent.selectOptions(columnFilterEl, "rotation_period");
  userEvent.selectOptions(comparisonFilterEl, "igual a");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "27");
  userEvent.click(buttonFilterEl);
  ["Kamino"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });

  const buttonRemoveFilterEl = screen.getAllByTestId("filter");
  expect(buttonRemoveFilterEl[2]).toBeInTheDocument();
  userEvent.click(buttonRemoveFilterEl[2].querySelector("button"));
  ["Alderaan", "Naboo", "Coruscant", "Kamino"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
  expect(buttonRemoveFilterEl[1]).toBeInTheDocument();
  userEvent.click(buttonRemoveFilterEl[1].querySelector("button"));
  ["Alderaan", "Bespin", "Naboo", "Coruscant", "Kamino"].forEach(
    (name, index) => {
      expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(
        `${name}`
      );
    }
  );
  userEvent.selectOptions(columnFilterEl, "orbital_period");
  userEvent.selectOptions(comparisonFilterEl, "igual a");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "5110");
  userEvent.click(buttonFilterEl);
  expect(buttonRemoveFilterEl[0]).toBeInTheDocument();
  userEvent.click(buttonRemoveFilterEl[0].querySelector("button"));
  ["Bespin"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
});

test("Verifica se clicar no botão 'Remover filtros', todos os filtros são removidos e a tabela é recarregada", async () => {
  jest.spyOn(global, "fetch");
  global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  await act(async () => render(<App />));

  const nameFilterEl = screen.getByTestId(/name-filter/i);
  expect(nameFilterEl).toBeInTheDocument();
  const columnFilterEl = screen.getByTestId(/column-filter/i);
  expect(columnFilterEl).toBeInTheDocument();
  const comparisonFilterEl = screen.getByTestId(/comparison-filter/i);
  expect(comparisonFilterEl).toBeInTheDocument();
  const valueFilterEl = screen.getByTestId(/value-filter/i);
  expect(valueFilterEl).toBeInTheDocument();
  const buttonFilterEl = screen.getByTestId(/button-filter/i);
  expect(buttonFilterEl).toBeInTheDocument();

  userEvent.selectOptions(columnFilterEl, "diameter");
  userEvent.selectOptions(comparisonFilterEl, "maior que");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "11000");
  userEvent.click(buttonFilterEl);
  ["Alderaan", "Bespin", "Naboo", "Coruscant", "Kamino"].forEach(
    (name, index) => {
      expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(
        `${name}`
      );
    }
  );
  userEvent.selectOptions(columnFilterEl, "orbital_period");
  userEvent.selectOptions(comparisonFilterEl, "menor que");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "500");
  userEvent.click(buttonFilterEl);
  ["Alderaan", "Naboo", "Coruscant", "Kamino"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
  userEvent.selectOptions(columnFilterEl, "rotation_period");
  userEvent.selectOptions(comparisonFilterEl, "igual a");
  userEvent.clear(valueFilterEl);
  userEvent.type(valueFilterEl, "27");
  userEvent.click(buttonFilterEl);
  ["Kamino"].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });

  const buttonRemoveAllFilterEl = screen.getByTestId("button-remove-filters");
  expect(buttonRemoveAllFilterEl).toBeInTheDocument();
  userEvent.click(buttonRemoveAllFilterEl);
  [
    "Tatooine",
    "Alderaan",
    "Yavin IV",
    "Hoth",
    "Dagobah",
    "Bespin",
    "Endor",
    "Naboo",
    "Coruscant",
    "Kamino",
  ].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
});

test("Verifica se clicar no botão 'Ordenar', as colunas são ordenadas de forma ascendente ou descendente", async () => {
  jest.spyOn(global, "fetch");
  global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  await act(async () => render(<App />));

  const columnSortEl = screen.getByTestId("column-sort");
  expect(columnSortEl).toBeInTheDocument();
  const columnSortInputAscEl = screen.getByTestId(/column-sort-input-asc/i);
  expect(columnSortInputAscEl).toBeInTheDocument();
  const columnSortInputDescEl = screen.getByTestId(/column-sort-input-desc/i);
  expect(columnSortInputDescEl).toBeInTheDocument();
  const columnSortButtonEl = screen.getByTestId(/column-sort-button/i);
  expect(columnSortButtonEl).toBeInTheDocument();

  userEvent.selectOptions(columnSortEl, "orbital_period");
  userEvent.click(columnSortInputDescEl);
  userEvent.click(columnSortButtonEl);
  [
    "Bespin",
    "Yavin IV",
    "Hoth",
    "Kamino",
    "Endor",
    "Coruscant",
    "Alderaan",
    "Dagobah",
    "Naboo",
    "Tatooine",
  ].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });

  userEvent.selectOptions(columnSortEl, "population");
  userEvent.click(columnSortInputDescEl);
  userEvent.click(columnSortButtonEl);
  [
    "Coruscant",
    "Naboo",
    "Alderaan",
    "Kamino",
    "Endor",
    "Bespin",
    "Tatooine",
    "Yavin IV",
    "Hoth",
    "Dagobah",
  ].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });

  userEvent.selectOptions(columnSortEl, "population");
  userEvent.click(columnSortInputAscEl);
  userEvent.click(columnSortButtonEl);
  [
    "Yavin IV",
    "Tatooine",
    "Bespin",
    "Endor",
    "Kamino",
    "Alderaan",
    "Naboo",
    "Coruscant",
    "Hoth",
    "Dagobah",
  ].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });

  userEvent.selectOptions(columnSortEl, "diameter");
  userEvent.click(columnSortInputAscEl);
  userEvent.click(columnSortButtonEl);
  [
    "Endor",
    "Hoth",
    "Dagobah",
    "Yavin IV",
    "Tatooine",
    "Naboo",
    "Coruscant",
    "Alderaan",
    "Kamino",
    "Bespin",
  ].forEach((name, index) => {
    expect(screen.getAllByRole("row")[index + 1]).toHaveTextContent(`${name}`);
  });
});
