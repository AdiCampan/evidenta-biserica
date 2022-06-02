export const calculateAge = (birthDate) => {
    if (!birthDate) {
        return '';
    }

    const dataNasteriiUnix = Math.floor(new Date(birthDate).getTime() / 1000);
    const dataCurentaUnix = Math.floor(new Date().getTime() / 1000);
    return Math.floor((dataCurentaUnix - dataNasteriiUnix) / 3600 / 24 / 365);
};

export const formatDate = (dateToFormat) => {
    if (!dateToFormat) {
        return '';
    }

    const date = new Date(dateToFormat);
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
};

export const searchField = (field, searchText) => {
    // if (field.trim().toLowerCase().indexOf(searchText.trim().toLowerCase()) !== -1) {
    //     return true;
    // } else {
    //     return false;
    // }
    if (searchText === '') {
        return false;
    }

    const result = field?.toString().length > 0 && field.toString().trim().toLowerCase().indexOf(searchText.trim().toLowerCase()) !== -1;
    return result;
}

export const filterByText = (members, field, searchText) => {
    return members.filter(member => {
        if (searchText === '') {
          return true;
        } else if (searchField(member[field], searchText)) {
          return true;
        }
        return false;
      });
}

export const filterByAge = (members, field, searchText) => {
    return members.filter(member => {
        if (searchText === '') {
          return true;
        } else if (searchField(calculateAge(member[field]), searchText)) {
          return true;
        }
        return false;
      });
}