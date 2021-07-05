import * as API from "./api";

export const buildQuery = ({ query = [] }) => {
  return query.length > 0 ?
    `query=${query
      .map(({ columnName, value, exact }) => exact? `${columnName}==${value}`:`${columnName}=ic='*${value}*'`)
      .join(';')}`
    :
    "";
}

export const getFormedURL = ({id, size, page, sorting = [], search, query = []}) => {
  const pagination = `&page=${page !== null ? page : 0}`;
  const sort = `&sort=${sorting.length > 0? sorting.map(({ columnName, direction }) => `${columnName}${!direction? "":`,${direction}`}`).join(';'):"codi"}`;
  const quickFilter = search && search !== "" ? `&quickFilter=${search}` : "";
  const searchQuery = buildQuery({ query });
  const URL = `${API[id]}?size=${size}${pagination}${sort}${quickFilter}${searchQuery.length && `&${searchQuery}`}`;
  return URL;
}