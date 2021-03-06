//
// fliters
//

export const addOption = (body: Object) => (dispatch: any) => {
  try {
    axios
      .post(serverUrl + "/admin/cms/filters/add-option", body)
      .then((res) => {
        dispatch(getLanguage());
      });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const deleteOption = (body: Object) => (dispatch: any) => {
  try {
    axios
      .post(serverUrl + "/admin/cms/filters/delete-option", body)
      .then((res) => {
        dispatch(getLanguage());
      });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const editOption = (body: Object) => (dispatch: any) => {
  try {
    axios
      .post(serverUrl + "/admin/cms/filters/edit-option", body)
      .then((res) => {
        dispatch(getLanguage());
      });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
