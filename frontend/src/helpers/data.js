import { sortBy } from "lodash-es";

function getClientFullName (client) {
  if (!client) return ''
  const { surname, name, middleName: middleNameOrigin, middle_name: middleNameAlt } = client
  const middleName = middleNameOrigin || middleNameAlt || ''
  return `${surname? surname + ' ' : ''}${name && name[0]? name[0] + '. ' : ''}${middleName && middleName[0] ? middleName[0] + '.' : ''}`
}

export function formatServicesData (data) {
  const noGroupTitle = 'Нет группы';
  if (!data || !Array.isArray(data) || !data.length) return [];
  const formattedData = data.map((item) => {
    let name = noGroupTitle;
    const { service_type = {} } = item;
    if (service_type) {
      const { name: group } = service_type;
      if (group) name = group;
    }
    return {
      ...item,
      group: name
    };
  });
  return sortBy(formattedData, (item) => {
    const { service_type } = item;
    if (service_type)
      return service_type.id;
    else
      return 9999;
  });
};

export function formatOrdersData (data) {
  return data.map((order) => {
    const { id, status, client } = order
    return {
      id,
      status,
      client: getClientFullName(client)
    }
  })
}

export function formatOrderData (data) {
  const { client, car, ...other} = data
  return {
    client_info: {
      client,
      car
    },
    ...other
  }
}

export function formatClientData (data) {
  if (!data) return {}
  const { name, surname, middle_name: middleName, car_vin: carVin } = data;
  return {
    ...data,
    middleName,
    carVin,
    firstLetter: surname ? surname[0] : '',
    title: getClientFullName({ surname, name, middleName }),
  };
}
